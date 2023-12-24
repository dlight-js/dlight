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

export type PropertyContainer = Record<
  string,
  {
    node: t.ClassProperty | t.ClassMethod
    deps: string[]
    isStatic?: boolean
    isContent?: boolean
    isChildren?: boolean | number
    isWatcher?: boolean
    isPropOrEnv?: "Prop" | "Env"
  }
>

export type IdentifierToDepNode = t.SpreadElement | t.Expression

export type SubViewPropSubDepMap = Record<string, Record<string, string[]>>
