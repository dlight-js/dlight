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
   * Custom HTML tags
   * @default defaultHtmlTags => defaultHtmlTags
   */
  htmlTags?: HTMLTags
}

export interface ViewParserProp {
  value: t.Expression
  nodes: Record<string, ViewParserUnit[]>
}

export interface TextViewParserUnit {
  type: "text"
  content: t.Expression
}

export interface HTMLViewParserUnit {
  type: "html"
  tag: t.Expression
  content?: ViewParserProp
  props?: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
}

export interface CustomViewParserUnit {
  type: "custom"
  tag: t.Expression
  content?: ViewParserProp
  props?: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
  isSubView?: boolean
}

export interface IfViewParserUnit {
  type: "if"
  conditions: IfCondition[]
}

export interface ForViewParserUnit {
  type: "for"
  item: t.LVal
  array: t.Expression
  key?: t.Expression
  children: ViewParserUnit[]
}

export type IdentifierToDepNode = t.SpreadElement | t.Expression

export interface ExpViewParserUnit {
  type: "exp"
  content: ViewParserProp
  props?: Record<string, ViewParserProp>
}

export interface EnvViewParserUnit {
  type: "env"
  props: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
}

export type ViewParserUnit =
  TextViewParserUnit
  | HTMLViewParserUnit
  | IfViewParserUnit
  | ForViewParserUnit
  | ExpViewParserUnit
  | EnvViewParserUnit
  | CustomViewParserUnit

export interface IfCondition {
  condition: t.Expression
  body: ViewParserUnit[]
}
