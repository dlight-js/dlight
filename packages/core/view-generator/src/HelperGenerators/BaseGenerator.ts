import { type types as t, type traverse } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "../types"
import ViewGenerator from "../ViewGenerator"

const devMode = process.env.NODE_ENV === "development"

export default class BaseGenerator {
  static readonly prefixMap = devMode
    ? { template: "$template", node: "$node" }
    : { template: "$t", node: "$n" }

  readonly viewParticle: ViewParticle
  readonly config: ViewGeneratorConfig
  readonly options?: ViewGeneratorOption

  readonly t: typeof t
  readonly traverse: typeof traverse
  readonly className: string
  readonly importMap: Record<string, string>

  readonly private: string[] = []
  readonly viewGenerator

  /**
   * @brief Constructor
   * @param viewUnit
   * @param config
   * @param options
   */
  constructor(
    viewParticle: ViewParticle,
    config: ViewGeneratorConfig,
    options?: ViewGeneratorOption
  ) {
    this.viewParticle = viewParticle
    this.config = config
    this.options = options
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.className = config.className
    this.importMap = config.importMap
    this.viewGenerator = new ViewGenerator(config, options)
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
  addUpdateStatements(dependencies: number[] | undefined, statement: t.Statement[]) {
    if (!dependencies || dependencies.length === 0) return
    dependencies = [...new Set(dependencies)]
    const depNum = BaseGenerator.calcDependencyNum(dependencies)
    if (!this.updateStatements[depNum]) this.updateStatements[depNum] = []
    this.updateStatements[depNum].push(...statement)
  }

  addUpdateStatementsWithoutDep(statement: t.Statement[]) {
    if (!this.updateStatements[0]) this.updateStatements[0] = []
    this.updateStatements[0].push(...statement)
  }

  /**
   * @returns [initStatements, updateStatements, classProperties, nodeName]
   */
  generate(): [t.Statement[], Record<number, t.Statement[]>, t.ClassProperty[], string] {
    const nodeName = this.run()
    return [
      this.initStatements,
      this.updateStatements,
      this.classProperties,
      nodeName
    ]
  }

  generateChildren(viewParticles: ViewParticle[], mergeStatements = true): [t.Statement[], string[], Record<number, t.Statement[]>] {
    this.viewGenerator.nodeIdx = this.nodeIdx
    this.viewGenerator.templateIdx = this.templateIdx
    const [initStatements, updateStatements, classProperties, topLevelNodes] = this.viewGenerator.generateChildren(viewParticles)
    this.nodeIdx = this.viewGenerator.nodeIdx
    this.templateIdx = this.viewGenerator.templateIdx
    this.classProperties.push(...classProperties)
    if (mergeStatements) this.mergeStatements(updateStatements)

    return [initStatements, topLevelNodes, updateStatements]
  }

  mergeStatements(statements: Record<number, t.Statement[]>) {
    Object.entries(statements).forEach(([depNum, statements]) => {
      if (!this.updateStatements[Number(depNum)]) {
        this.updateStatements[Number(depNum)] = []
      }
      this.updateStatements[Number(depNum)].push(...statements)
    })
  }

  generateChild(viewParticle: ViewParticle, mergeStatements = true): [t.Statement[], string, Record<number, t.Statement[]>] {
    this.viewGenerator.nodeIdx = this.nodeIdx
    this.viewGenerator.templateIdx = this.templateIdx
    const [initStatements, updateStatements, classProperties, nodeName] = this.viewGenerator.generateChild(viewParticle)
    this.nodeIdx = this.viewGenerator.nodeIdx
    this.templateIdx = this.viewGenerator.templateIdx
    this.classProperties.push(...classProperties)
    if (mergeStatements) this.mergeStatements(updateStatements)

    return [initStatements, nodeName, updateStatements]
  }

  geneUpdateBody(updateStatements: Record<number, t.Statement[]>): t.BlockStatement {
    return (
      this.t.blockStatement([
        ...Object.entries(updateStatements)
          .filter(([depNum]) => depNum !== "0")
          .map(([depNum, statements]) => {
            return (
              this.t.ifStatement(
                this.t.binaryExpression(
                  "&",
                  this.t.identifier("changed"),
                  this.t.numericLiteral(Number(depNum))
                ),
                this.t.blockStatement(statements)
              )
            )
          }),
        ...updateStatements[0] ?? []
      ])
    )
  }

  generateReturnStatement(topLevelNodes: string[]) {
    return (
      this.t.returnStatement(
        this.t.arrayExpression(
          topLevelNodes.map(name => this.t.identifier(name))
        )
      )
    )
  }

  run(): string { return "" }

  // ---- Name ----
  nodeIdx = -1
  generateNodeName(idx?: number): string {
    return `${BaseGenerator.prefixMap.node}${idx ?? ++this.nodeIdx}`
  }

  templateIdx = -1
  generateTemplateName(): string {
    return `${BaseGenerator.prefixMap.template}${++this.templateIdx}`
  }

  // ---- @Utils -----
  static calcDependencyNum(dependencies: number[] | undefined): number {
    if (!dependencies || dependencies.length === 0) return 0
    return dependencies.reduce((acc, dep) => acc + (1 << dep), 0)
  }

  static statementsCollector(): [t.Statement[], (...statements: t.Statement[] | t.Statement[][]) => void] {
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
