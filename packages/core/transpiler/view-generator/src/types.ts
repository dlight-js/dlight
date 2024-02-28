import type Babel from "@babel/core"

export type SnippetPropMap = Record<string, string[]>
export interface ViewGeneratorConfig {
  babelApi: typeof Babel
  className: string
  importMap: Record<string, string>
  snippetPropMap: SnippetPropMap
  templateIdx: number
  attributeMap: Record<string, string[]>
  alterAttributeMap: Record<string, string>
}
