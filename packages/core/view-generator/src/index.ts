import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
import { type types as t } from "@babel/core"
import MainViewGenerator from "./MainViewGenerator"
import SubViewGenerator from "./SubViewGenerator"

export function generateView(
  viewParticles: ViewParticle[],
  config: ViewGeneratorConfig,
  options?: ViewGeneratorOption
): [t.BlockStatement, t.ClassProperty[], number] {
  return new MainViewGenerator(config, options).generate(viewParticles)
}

export function generateSubView(
  viewParticlesWithPropertyDep: ViewParticle[],
  viewParticlesWithIdentityDep: ViewParticle[],
  propNode: t.ObjectPattern,
  config: ViewGeneratorConfig,
  options?: ViewGeneratorOption
): [t.BlockStatement, t.ClassProperty[], number] {
  return new SubViewGenerator(config, options)
    .generate(viewParticlesWithPropertyDep, viewParticlesWithIdentityDep, propNode)
}

export type * from "./types"
