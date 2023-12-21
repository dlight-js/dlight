import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
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
  options?: ViewGeneratorOption

  t: typeof t

  constructor(
    config: ViewGeneratorConfig,
    options?: ViewGeneratorOption
  ) {
    this.config = config
    this.options = options
    this.t = config.babelApi.types
    this.templateIdx = config.templateIdx
  }

  static generatorMap: Record<string, typeof BaseGenerator> = {
    comp: CompGenerator,
    html: HTMLGenerator,
    template: TemplateGenerator,
    for: ForGenerator,
    if: IfGenerator,
    env: EnvGenerator,
    text: TextGenerator,
    exp: ExpGenerator,
    subview: SubViewGenerator
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
}
