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
  /**
   * Allowed HTML tags from attributes
   * e.g. { alt: ["area", "img", "input"] }
   */
  attributeMap?: Record<string, string[]>
}

export type PropertyContainer = Record<
  string,
  {
    node: t.ClassProperty | t.ClassMethod
    deps: string[]
    isStatic?: boolean
    isContent?: boolean
    isChildren?: boolean | number
    isModel?: boolean
    isWatcher?: boolean
    isPropOrEnv?: "Prop" | "Env"
    depsNode?: t.ArrayExpression
  }
>

export type IdentifierToDepNode = t.SpreadElement | t.Expression

export type SnippetPropSubDepMap = Record<string, Record<string, string[]>>
