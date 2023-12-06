import syntaxTypescript from "babel-plugin-syntax-typescript-new"
// @ts-ignore
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions"
// @ts-ignore
import syntaxDecorators from "@babel/plugin-syntax-decorators"
import dlight, { type DLightOption } from "./plugin"

export { type DLightOption }
export default function(api: any, options: DLightOption) {
  return {
    plugins: [
      syntaxTypescript,
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [dlight, options]
    ]
  }
}
