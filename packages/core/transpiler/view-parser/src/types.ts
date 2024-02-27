import type Babel from "@babel/core"
import { type types as t } from "@babel/core"

export interface ViewProp {
  value: t.Expression
  viewPropMap: Record<string, ViewUnit[]>
}

export interface TextUnit {
  type: "text"
  content: t.Expression
}

export interface HTMLUnit {
  type: "html"
  tag: t.Expression
  props: Record<string, ViewProp>
  children: ViewUnit[]
}

export interface CompUnit {
  type: "comp"
  tag: t.Expression
  props: Record<string, ViewProp>
  children: ViewUnit[]
}

export interface ForUnit {
  type: "for"
  item: t.LVal
  array: t.Expression
  key: t.Expression
  children: ViewUnit[]
}

export interface IfBranch {
  condition: t.Expression
  children: ViewUnit[]
}

export interface IfUnit {
  type: "if"
  branches: IfBranch[]
}

export interface SwitchBranch {
  case: t.Expression
  children: ViewUnit[]
  break: boolean
}

export interface TryUnit {
  type: "try"
  children: ViewUnit[]
  exception: t.Identifier | t.ArrayPattern | t.ObjectPattern | null
  catchChildren: ViewUnit[]
}

export interface SwitchUnit {
  type: "switch"
  discriminant: t.Expression | null
  branches: SwitchBranch[]
}

export interface EnvUnit {
  type: "env"
  props: Record<string, ViewProp>
  children: ViewUnit[]
}

export interface ExpUnit {
  type: "exp"
  content: ViewProp
  props: Record<string, ViewProp>
}

export interface SubviewUnit {
  type: "subview"
  tag: string
  props: Record<string, ViewProp>
  children: ViewUnit[]
}

export type ViewUnit =
  | TextUnit
  | HTMLUnit
  | CompUnit
  | IfUnit
  | ForUnit
  | EnvUnit
  | ExpUnit
  | SubviewUnit
  | SwitchUnit
  | TryUnit

export interface ViewParserConfig {
  babelApi: typeof Babel
  subviewNames: string[]
  htmlTags: string[]
}
