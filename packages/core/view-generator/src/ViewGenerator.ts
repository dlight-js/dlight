import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
import type BaseGenerator from "./BaseGenerator"
import CompGenerator from "./CompGenerator"
import HTMLGenerator from "./HTMLGenerator"
import TemplateGenerator from "./TemplateGenerator"
import ForGenerator from "./ForGenerator"
import IfGenerator from "./IfGenerator"
import EnvGenerator from "./EnvGenerator"
import TextGenerator from "./TextGenerator"

export default class ViewGenerator {
  config: ViewGeneratorConfig
  options?: ViewGeneratorOption

  t: typeof t

  constructor(
    config: ViewGeneratorConfig,
    options?: ViewGeneratorOption
  ) {
    this.config = config
    this.options = options
    this.t = config.babelApi.types
  }

  static generatorMap: Record<string, typeof BaseGenerator> = {
    comp: CompGenerator,
    html: HTMLGenerator,
    template: TemplateGenerator,
    for: ForGenerator,
    if: IfGenerator,
    env: EnvGenerator,
    text: TextGenerator
  }

  generate(viewParticles: ViewParticle[]): [t.BlockStatement, t.ClassProperty[]] {
    const allClassProperties: t.ClassProperty[] = []
    const allInitStatements: t.Statement[] = []
    const allUpdateStatements: Record<number, t.Statement[]> = {}
    const topLevelNodes: string[] = []

    viewParticles.forEach(viewParticle => {
      const [initStatements, updateStatements, classProperties, nodeName] = this.generateChild(viewParticle)
      allInitStatements.push(...initStatements)
      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!allUpdateStatements[Number(depNum)]) {
          allUpdateStatements[Number(depNum)] = []
        }
        allUpdateStatements[Number(depNum)].push(...statements)
      })
      allClassProperties.push(...classProperties)
      topLevelNodes.push(nodeName)
    })

    const viewBody = (
      this.t.blockStatement([
        ...allInitStatements,
        ...this.geneUpdate(allUpdateStatements),
        this.geneReturn(topLevelNodes)
      ])
    )

    return [viewBody, allClassProperties]
  }

  generateChildren(viewParticles: ViewParticle[]): [t.Statement[], Record<number, t.Statement[]>, t.ClassProperty[], string[]] {
    const allInitStatements: t.Statement[] = []
    const allClassProperties: t.ClassProperty[] = []
    const allUpdateStatements: Record<number, t.Statement[]> = {}
    const topLevelNodes: string[] = []

    viewParticles.forEach(viewParticle => {
      const [initStatements, updateStatements, classProperties, nodeName] = this.generateChild(viewParticle)
      allInitStatements.push(...initStatements)
      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!allUpdateStatements[Number(depNum)]) {
          allUpdateStatements[Number(depNum)] = []
        }
        allUpdateStatements[Number(depNum)].push(...statements)
      })
      allClassProperties.push(...classProperties)
      topLevelNodes.push(nodeName)
    })

    return [allInitStatements, allUpdateStatements, allClassProperties, topLevelNodes]
  }

  nodeIdx = -1
  templateIdx = -1
  generateChild(viewParticle: ViewParticle) {
    const { type } = viewParticle
    const GeneratorClass = ViewGenerator.generatorMap[type]
    if (!GeneratorClass) {
      throw new Error(`Unknown view particle type: ${type}`)
    }
    const generator = new GeneratorClass(
      viewParticle,
      this.config,
      this.options
    )
    generator.nodeIdx = this.nodeIdx
    generator.templateIdx = this.templateIdx
    const result = generator.generate()
    this.nodeIdx = generator.nodeIdx
    this.templateIdx = generator.templateIdx
    return result
  }

  /**
   * this._$update = (changed) => {
   *  if (changed & 1) {
   *    ...
   *  }
   *  ...
   * }
   */
  private geneUpdate(updateStatements: Record<number, t.Statement[]>): t.Statement[] {
    if (Object.keys(updateStatements).length === 0) return []
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$update"),
            false
          ),
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed")],
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
        )
      )
    ]
  }

  /**
   * return [${nodeNames}]
   */
  private geneReturn(topLevelNodes: string[]) {
    return (
      this.t.returnStatement(
        this.t.arrayExpression(
          topLevelNodes.map(nodeName => this.t.identifier(nodeName))
        )
      )
    )
  }
}
