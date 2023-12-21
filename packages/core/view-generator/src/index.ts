import { type ViewParticle } from "@dlightjs/reactivity-parser"
import ViewGenerator from "./ViewGenerator"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
import { type types as t } from "@babel/core"

export function generateView(
  viewParticles: ViewParticle[],
  config: ViewGeneratorConfig,
  options?: ViewGeneratorOption
): [t.BlockStatement, t.ClassProperty[]] {
  return new ViewGenerator(config, options).generate(viewParticles)
}
