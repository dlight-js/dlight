import type Babel from "@babel/core"

export interface ViewGeneratorConfig {
  babelApi: typeof Babel
  className: string
  importMap: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewGeneratorOption {
}
