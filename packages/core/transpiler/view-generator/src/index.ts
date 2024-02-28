import { type ViewParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig } from "./types"
import { type types as t } from "@babel/core"
import MainViewGenerator from "./MainViewGenerator"
import SnippetGenerator from "./SnippetGenerator"

export function generateView(
  viewParticles: ViewParticle[],
  config: ViewGeneratorConfig
): [t.BlockStatement, t.ClassProperty[], number] {
  return new MainViewGenerator(config).generate(viewParticles)
}

export function generateSnippet(
  viewParticlesWithPropertyDep: ViewParticle[],
  viewParticlesWithIdentityDep: ViewParticle[],
  propNode: t.ObjectPattern,
  config: ViewGeneratorConfig
): [t.BlockStatement, t.ClassProperty[], number] {
  return new SnippetGenerator(config).generate(
    viewParticlesWithPropertyDep,
    viewParticlesWithIdentityDep,
    propNode
  )
}

export type * from "./types"
