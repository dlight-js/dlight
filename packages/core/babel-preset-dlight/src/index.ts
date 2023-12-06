import syntaxTypescript from "babel-plugin-syntax-typescript-new"
// @ts-ignore
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions"
// @ts-ignore
import syntaxDecorators from "@babel/plugin-syntax-decorators"
import dlight from "./plugin"
import { type DLightOption } from "./types"
import { type ConfigAPI } from "@babel/core"

export { type DLightOption }
export default function(_: ConfigAPI, options: DLightOption) {
  return {
    plugins: [
      syntaxTypescript,
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [dlight, options]
    ]
  }
}
