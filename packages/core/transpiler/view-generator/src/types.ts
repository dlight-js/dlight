import type Babel from "@babel/core"

export type SubViewPropMap = Record<string, string[]>
export interface ViewGeneratorConfig {
  babelApi: typeof Babel
  className: string
  importMap: Record<string, string>
  subViewPropMap: SubViewPropMap
  templateIdx: number
  attributeMap: Record<string, string[]>
  alterAttributeMap: Record<string, string>
}
