import { type types as t } from "@babel/core"

export type HTMLTags = string[] | ((defaultHtmlTags: string[]) => string[])
export interface DLightOption {
  /**
   * Files that will be included
   * @default ** /*.{js,jsx,ts,tsx}
   */
  files?: string | string[]
  /**
   * Files that will be excludes
   * @default ** /{dist,node_modules,lib}/*.{js,ts}
   */
  excludeFiles?: string | string[]
  /**
   * Enable devtools
   * @default false
   */
  enableDevTools?: boolean
  /**
   * Custom HTML tags.
   * Accepts 2 types:
   *  1. string[], e.g. ["div", "span"]
   *     if contains "*", then all default tags will be included
   *  2. (defaultHtmlTags: string[]) => string[]
   * @default defaultHtmlTags => defaultHtmlTags
   */
  htmlTags?: HTMLTags
}

export type PropertyContainer = Record<string, {
  node: t.ClassProperty
  deps: string[]
  isStatic?: boolean
  isContent?: boolean
  isChildren?: boolean | number
  isWatcher?: boolean
  isPropOrEnv?: "Prop" | "Env"
}>

export interface ViewHTMLPropStatic {
  value: string | number | boolean
}
export interface ViewHTMLPropDynamic {
  computed: true
  value: t.Expression
  nodes: Record<string, ViewUnit[]>
}
export interface ViewProp {
  value: t.Expression
  nodes: Record<string, ViewUnit[]>
}

export type ViewHTMLProp = ViewHTMLPropStatic | ViewHTMLPropDynamic

export interface TextViewUnitStatic {
  type: "text"
  content: string | number | boolean
}
export interface TextViewUnitDynamic {
  type: "text"
  content: t.Expression
  computed: true
}

export type TextViewUnit = TextViewUnitStatic | TextViewUnitDynamic

export interface HTMLViewUnitStatic {
  type: "html"
  tag: string
  props?: Record<string, ViewHTMLProp>
  children?: ViewUnit[]
}

export interface HTMLViewUnitDynamic {
  type: "html"
  tag: t.Expression
  props?: Record<string, ViewHTMLProp>
  children?: ViewUnit[]
  computed: true
}
export type HTMLViewUnit = HTMLViewUnitStatic | HTMLViewUnitDynamic

export interface CustomViewUnit {
  type: "custom"
  tag: t.Expression
  content?: ViewProp
  props?: Record<string, ViewProp>
  children?: ViewUnit[]
}

export interface SubviewUnit {
  type: "subview"
  tag: string
  props?: Record<string, ViewProp>
  children?: ViewUnit[]
}

export interface IfViewUnit {
  type: "if"
  conditions: IfCondition[]
}

export interface ForViewUnit {
  type: "for"
  item: t.LVal
  array: t.Expression
  key?: t.Expression
  children: ViewUnit[]
}

export type IdentifierToDepNode = t.SpreadElement | t.Expression

export interface ExpViewUnit {
  type: "exp"
  content: ViewProp
  props?: Record<string, ViewProp>
}

export interface EnvViewUnit {
  type: "env"
  props: Record<string, ViewProp>
  children?: ViewUnit[]
}

export type ViewUnit =
  TextViewUnit
  | HTMLViewUnit
  | IfViewUnit
  | ForViewUnit
  | ExpViewUnit
  | EnvViewUnit
  | CustomViewUnit
  | SubviewUnit

export interface IfCondition {
  condition: t.Expression
  body: ViewUnit[]
}
