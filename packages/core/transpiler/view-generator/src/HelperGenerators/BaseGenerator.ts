import { type types as t, type traverse } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type SubViewPropMap, type ViewGeneratorConfig } from "../types"
import ViewGenerator from "../ViewGenerator"

const devMode = process.env.NODE_ENV === "development"

export default class BaseGenerator {
  static readonly prefixMap = devMode
    ? { template: "$template", node: "$node" }
    : { template: "$t", node: "$n" }

  readonly viewParticle: ViewParticle
  readonly config: ViewGeneratorConfig

  readonly t: typeof t
  readonly traverse: typeof traverse
  readonly className: string
  readonly importMap: Record<string, string>
  readonly subViewPropMap: SubViewPropMap

  readonly viewGenerator

  /**
   * @brief Constructor
   * @param viewUnit
   * @param config
   */
  constructor(viewParticle: ViewParticle, config: ViewGeneratorConfig) {
    this.viewParticle = viewParticle
    this.config = config
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.className = config.className
    this.importMap = config.importMap
    this.subViewPropMap = config.subViewPropMap
    this.viewGenerator = new ViewGenerator(config)
  }

  // ---- Init Statements
  private readonly initStatements: t.Statement[] = []
  addInitStatement(...statements: t.Statement[]) {
    this.initStatements.push(...statements)
  }

  // ---- Added Class Properties, typically used in for Template
  private readonly classProperties: t.ClassProperty[] = []
  addStaticClassProperty(key: string, value: t.Expression) {
    this.classProperties.push(
      this.t.classProperty(
        this.t.identifier(key),
        value,
        undefined,
        undefined,
        undefined,
        true
      )
    )
  }

  // ---- Update Statements
  private readonly updateStatements: Record<number, t.Statement[]> = {}
  addUpdateStatements(
    dependencies: number[] | undefined,
    statement: t.Statement
  ) {
    if (!dependencies || dependencies.length === 0) return
    dependencies = [...new Set(dependencies)]
    const depNum = BaseGenerator.calcDependencyNum(dependencies)
    if (!this.updateStatements[depNum]) this.updateStatements[depNum] = []
    this.updateStatements[depNum].push(statement)
  }

  addUpdateStatementsWithoutDep(statement: t.Statement) {
    if (!this.updateStatements[0]) this.updateStatements[0] = []
    this.updateStatements[0].push(statement)
  }

  /**
   * @returns [initStatements, updateStatements, classProperties, nodeName]
   */
  generate(): [
    t.Statement[],
    Record<number, t.Statement[]>,
    t.ClassProperty[],
    string,
  ] {
    const nodeName = this.run()
    return [
      this.initStatements,
      this.updateStatements,
      this.classProperties,
      nodeName,
    ]
  }

  /**
   * @brief Generate the view given the view particles, mainly used for child particles parsing
   * @param viewParticles
   * @param mergeStatements
   * @returns [initStatements, topLevelNodes, updateStatements]
   */
  generateChildren(
    viewParticles: ViewParticle[],
    mergeStatements = true
  ): [t.Statement[], string[], Record<number, t.Statement[]>] {
    this.viewGenerator.nodeIdx = this.nodeIdx
    this.viewGenerator.templateIdx = this.templateIdx
    const [initStatements, updateStatements, classProperties, topLevelNodes] =
      this.viewGenerator.generateChildren(viewParticles)
    this.nodeIdx = this.viewGenerator.nodeIdx
    this.templateIdx = this.viewGenerator.templateIdx
    this.classProperties.push(...classProperties)
    if (mergeStatements) this.mergeStatements(updateStatements)

    return [initStatements, topLevelNodes, updateStatements]
  }

  /**
   * @brief Merge the update statements
   * @param statements
   */
  private mergeStatements(statements: Record<number, t.Statement[]>): void {
    Object.entries(statements).forEach(([depNum, statements]) => {
      if (!this.updateStatements[Number(depNum)]) {
        this.updateStatements[Number(depNum)] = []
      }
      this.updateStatements[Number(depNum)].push(...statements)
    })
  }

  /**
   * @brief Generate the view given the view particle
   * @param viewParticle
   * @param mergeStatements
   * @returns [initStatements, nodeName, updateStatements]
   */
  generateChild(
    viewParticle: ViewParticle,
    mergeStatements = true
  ): [t.Statement[], string, Record<number, t.Statement[]>] {
    this.viewGenerator.nodeIdx = this.nodeIdx
    this.viewGenerator.templateIdx = this.templateIdx
    const [initStatements, updateStatements, classProperties, nodeName] =
      this.viewGenerator.generateChild(viewParticle)
    this.nodeIdx = this.viewGenerator.nodeIdx
    this.templateIdx = this.viewGenerator.templateIdx
    this.classProperties.push(...classProperties)
    if (mergeStatements) this.mergeStatements(updateStatements)

    return [initStatements, nodeName, updateStatements]
  }

  /**
   * @View
   * this._$update = (changed) => {
   *   if (changed & 1) {
   *     ...
   *   }
   *   ...
   * }
   */
  geneUpdateBody(
    updateStatements: Record<number, t.Statement[]>
  ): t.BlockStatement {
    return this.t.blockStatement([
      ...Object.entries(updateStatements)
        .filter(([depNum]) => depNum !== "0")
        .map(([depNum, statements]) => {
          return this.t.ifStatement(
            this.t.binaryExpression(
              "&",
              this.t.identifier("changed"),
              this.t.numericLiteral(Number(depNum))
            ),
            this.t.blockStatement(statements)
          )
        }),
      ...(updateStatements[0] ?? []),
    ])
  }

  /**
   * @View
   * return [${topLevelNodes}]
   */
  generateReturnStatement(topLevelNodes: string[]): t.ReturnStatement {
    return this.t.returnStatement(
      this.t.arrayExpression(topLevelNodes.map(name => this.t.identifier(name)))
    )
  }

  /**
   * @brief To be implemented by the subclass as the main node generation function
   * @returns dlNodeName
   */
  run(): string {
    return ""
  }

  // ---- Name ----
  // ---- Used as dlNodeName for any node declaration
  nodeIdx = -1
  generateNodeName(idx?: number): string {
    return `${BaseGenerator.prefixMap.node}${idx ?? ++this.nodeIdx}`
  }

  // ---- Used as template generation as class property
  templateIdx = -1
  generateTemplateName(): string {
    return `${BaseGenerator.prefixMap.template}${++this.templateIdx}`
  }

  // ---- @Utils -----
  /**
   *
   * @param updateStatements
   * @returns
   */

  /**
   * @brief Calculate the dependency number from an array of dependency index
   *  e.g.
   *    [0, 1, 2] => 0b111 => 7
   *    [1, 3] => 0b1010 => 10
   * @param dependencies
   * @returns dependency number
   */
  static calcDependencyNum(dependencies: number[] | undefined): number {
    if (!dependencies || dependencies.length === 0) return 0
    return dependencies.reduce((acc, dep) => acc + (1 << dep), 0)
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  valueWrapper(node: t.Expression | t.Statement): t.File {
    return this.t.file(
      this.t.program([
        this.t.isStatement(node) ? node : this.t.expressionStatement(node),
      ])
    )
  }

  /**
   * @brief Shorthand function for collecting statements in batch
   * @returns [statements, collect]
   */
  static statementsCollector(): [
    t.Statement[],
    (...statements: t.Statement[] | t.Statement[][]) => void,
  ] {
    const statements: t.Statement[] = []
    const collect = (...newStatements: t.Statement[] | t.Statement[][]) => {
      newStatements.forEach(s => {
        if (Array.isArray(s)) {
          statements.push(...s)
        } else {
          statements.push(s)
        }
      })
    }

    return [statements, collect]
  }
}