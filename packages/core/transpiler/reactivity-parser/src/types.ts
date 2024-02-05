import { type types as t } from "@babel/core"
import type Babel from "@babel/core"

export interface DependencyValue<T> {
  value: T
  dependencyIndexArr?: number[]
}

export interface DependencyProp {
  value: t.Expression
  viewPropMap?: Record<string, ViewParticle[]>
  dependencyIndexArr?: number[]
}

export interface TemplateProp {
  tag: string
  key: string
  path: number[]
  value: t.Expression
  dependencyIndexArr?: number[]
}

export type MutableParticle = ViewParticle & { path: number[] }

export interface TemplateParticle {
  type: "template"
  template: HTMLParticle
  mutableParticles: MutableParticle[]
  props: TemplateProp[]
}

export interface TextParticle {
  type: "text"
  content: DependencyValue<t.Expression>
}

export interface HTMLParticle {
  type: "html"
  tag: t.Expression
  props?: Record<string, DependencyValue<t.Expression>>
  children?: ViewParticle[]
}

export interface CompParticle {
  type: "comp"
  tag: t.Expression
  content?: DependencyProp
  props?: Record<string, DependencyProp>
  children?: ViewParticle[]
}

export interface ForParticle {
  type: "for"
  item: t.LVal
  array: DependencyValue<t.Expression>
  key?: t.Expression
  children: ViewParticle[]
}

export interface IfBranch {
  condition: DependencyValue<t.Expression>
  children: ViewParticle[]
}

export interface IfParticle {
  type: "if"
  branches: IfBranch[]
}

export interface SwitchBranch {
  case: DependencyValue<t.Expression> | null | undefined
  children: ViewParticle[]
  break: boolean
}

export interface SwitchParticle {
  type: "switch"
  discriminant: DependencyValue<t.Expression>
  branches: SwitchBranch[]
}

export interface EnvParticle {
  type: "env"
  props: Record<string, DependencyProp>
  children: ViewParticle[]
}

export interface ExpParticle {
  type: "exp"
  content: DependencyProp
  props?: Record<string, DependencyProp>
}

export interface SubviewParticle {
  type: "subview"
  tag: string
  props?: Record<string, DependencyProp>
  children?: ViewParticle[]
}

export type ViewParticle =
  | TemplateParticle
  | TextParticle
  | HTMLParticle
  | CompParticle
  | ForParticle
  | IfParticle
  | EnvParticle
  | ExpParticle
  | SwitchParticle
  | SubviewParticle

export interface ReactivityParserConfig {
  babelApi: typeof Babel
  availableProperties: string[]
  dependencyMap: Record<string, string[]>
  identifierDepMap?: Record<string, string[]>
  dependencyParseType?: "property" | "identifier"
  parseTemplate?: boolean
  reactivityFuncNames?: string[]
}
