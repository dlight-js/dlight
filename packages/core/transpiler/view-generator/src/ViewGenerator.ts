import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig } from "./types"
import type BaseGenerator from "./HelperGenerators/BaseGenerator"
import CompGenerator from "./NodeGenerators/CompGenerator"
import HTMLGenerator from "./NodeGenerators/HTMLGenerator"
import TemplateGenerator from "./NodeGenerators/TemplateGenerator"
import ForGenerator from "./NodeGenerators/ForGenerator"
import IfGenerator from "./NodeGenerators/IfGenerator"
import EnvGenerator from "./NodeGenerators/EnvGenerator"
import TextGenerator from "./NodeGenerators/TextGenerator"
import ExpGenerator from "./NodeGenerators/ExpGenerator"
import SubViewGenerator from "./NodeGenerators/SubViewGenerator"

export default class ViewGenerator {
  config: ViewGeneratorConfig
  t: typeof t

  /**
   * @brief Construct the view generator from config
   * @param config
   */
  constructor(config: ViewGeneratorConfig) {
    this.config = config
    this.t = config.babelApi.types
    this.templateIdx = config.templateIdx
  }

  /**
   * @brief Different generator classes for different view particle types
   */
  static generatorMap: Record<string, typeof BaseGenerator> = {
    comp: CompGenerator,
    html: HTMLGenerator,
    template: TemplateGenerator,
    for: ForGenerator,
    if: IfGenerator,
    env: EnvGenerator,
    text: TextGenerator,
    exp: ExpGenerator,
    subview: SubViewGenerator,
  }

  /**
   * @brief Generate the view given the view particles, mainly used for child particles parsing
   * @param viewParticles
   * @returns [initStatements, updateStatements, classProperties, topLevelNodes]
   */
  generateChildren(
    viewParticles: ViewParticle[]
  ): [
    t.Statement[],
    Record<number, t.Statement[]>,
    t.ClassProperty[],
    string[],
  ] {
    const allInitStatements: t.Statement[] = []
    const allClassProperties: t.ClassProperty[] = []
    const allUpdateStatements: Record<number, t.Statement[]> = {}
    const topLevelNodes: string[] = []

    viewParticles.forEach(viewParticle => {
      const [initStatements, updateStatements, classProperties, nodeName] =
        this.generateChild(viewParticle)
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

    return [
      allInitStatements,
      allUpdateStatements,
      allClassProperties,
      topLevelNodes,
    ]
  }

  nodeIdx = -1
  templateIdx = -1
  /**
   * @brief Generate the view given the view particle, using generator from the map
   * @param viewParticle
   * @returns
   */
  generateChild(viewParticle: ViewParticle) {
    const { type } = viewParticle
    const GeneratorClass = ViewGenerator.generatorMap[type]
    if (!GeneratorClass) {
      throw new Error(`Unknown view particle type: ${type}`)
    }
    const generator = new GeneratorClass(viewParticle, this.config)
    generator.nodeIdx = this.nodeIdx
    generator.templateIdx = this.templateIdx
    const result = generator.generate()
    this.nodeIdx = generator.nodeIdx
    this.templateIdx = generator.templateIdx
    return result
  }
}