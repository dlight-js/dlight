import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig } from "./types"
import { type types as t } from "@babel/core"
import MainViewGenerator from "./MainViewGenerator"
import SubViewGenerator from "./SubViewGenerator"

export function generateView(
  viewParticles: ViewParticle[],
  config: ViewGeneratorConfig
): [t.BlockStatement, t.ClassProperty[], number] {
  return new MainViewGenerator(config).generate(viewParticles)
}

export function generateSubView(
  viewParticlesWithPropertyDep: ViewParticle[],
  viewParticlesWithIdentityDep: ViewParticle[],
  propNode: t.ObjectPattern,
  config: ViewGeneratorConfig
): [t.BlockStatement, t.ClassProperty[], number] {
  return new SubViewGenerator(config).generate(
    viewParticlesWithPropertyDep,
    viewParticlesWithIdentityDep,
    propNode
  )
}

export type * from "./types"
