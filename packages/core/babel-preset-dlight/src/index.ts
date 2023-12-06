import syntaxTypescript from "babel-plugin-syntax-typescript-new"
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions"
import syntaxDecorators from "@babel/plugin-syntax-decorators"
import dlight from "./plugin"
import { type DLightOption } from "./types"
import { type ConfigAPI, type TransformOptions } from "@babel/core"

export default function(_: ConfigAPI, options: DLightOption): TransformOptions {
  return {
    plugins: [
      syntaxTypescript,
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [dlight, options]
    ]
  }
}

export { type DLightOption }

export * from "./types"
export { PluginProvider, changePluginProviderClass } from "./pluginProvider"
export { ViewParser, changeViewParserClass } from "./viewParser"
export { ViewGenerator, changeViewGeneratorClass } from "./viewGenerator"
