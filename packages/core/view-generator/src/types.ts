import type Babel from "@babel/core"

export type SubViewPropMap = Record<string, string[]>
export interface ViewGeneratorConfig {
  babelApi: typeof Babel
  className: string
  importMap: Record<string, string>
  subViewPropMap: SubViewPropMap
  templateIdx: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewGeneratorOption {
}
