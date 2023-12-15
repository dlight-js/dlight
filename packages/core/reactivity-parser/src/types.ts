import { type types as t } from "@babel/core"
import type Babel from "@babel/core"

export interface DependencyValue<T> {
  value: T
  dependencyIndexArr?: number[]
}

export interface DependencyProp {
  value: t.Expression
  viewPropMap?: Record<string, DLParticle[]>
  dependencyIndexArr?: number[]
}

export interface TemplateProp {
  key: string
  path: number[]
  value: t.Expression
  viewPropMap?: Record<string, DLParticle[]>
  dependencyIndexArr?: number[]
}

export type mutableParticle = DLParticle & { path: number[] }

export interface TemplateParticle {
  type: "template"
  template: string
  mutableParticles: mutableParticle[]
  props: TemplateProp[]
}

export interface TextParticle {
  type: "text"
  content: DependencyValue<t.Expression>
}

export interface HTMLParticle {
  type: "html"
  tag: DependencyValue<t.Expression>
  content?: DependencyProp
  props?: Record<string, DependencyProp>
  children?: DLParticle[]
}

export interface CompParticle {
  type: "custom"
  tag: t.Expression
  content?: DependencyProp
  props?: Record<string, DependencyProp>
  children?: DLParticle[]
}

export interface ForParticle {
  type: "for"
  item: DependencyValue<t.LVal>
  array: DependencyValue<t.Expression>
  key?: t.Expression
  children: DLParticle[]
}

export interface IfCondition {
  condition: DependencyValue<t.Expression>
  children: DLParticle[]
}

export interface IfParticle {
  type: "if"
  conditions: IfCondition[]
}

export interface EnvParticle {
  type: "env"
  props: Record<string, DependencyProp>
  children: DLParticle[]
}

export interface ExpParticle {
  type: "exp"
  content: DependencyProp
  props?: Record<string, DependencyProp>
}

export interface SubviewParticle {
  type: "subview"
  tag: DependencyValue<t.Expression>
  props?: Record<string, DependencyProp>
  children?: DLParticle[]
}

export type DLParticle =
  | TemplateParticle
  | TextParticle
  | HTMLParticle
  | CompParticle
  | ForParticle
  | IfParticle
  | EnvParticle
  | ExpParticle
  | SubviewParticle

export interface ReactivityParserConfig {
  babelApi: typeof Babel
  availableProperties: string[]
  dependencyMap: Record<string, string[]>
}

export interface ReactivityParserOption {
  escapeNamings?: string[]
}
