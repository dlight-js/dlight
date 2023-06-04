// @ts-ignore
import syntaxTypescript from "@babel/plugin-syntax-typescript"
// @ts-ignore
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions"
// @ts-ignore
import syntaxDecorators from "@babel/plugin-syntax-decorators"
// @ts-ignore
import dlight from "babel-plugin-dlight"

export default function() {
  return {
    plugins: [
      syntaxTypescript.default ?? syntaxTypescript,
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      dlight
    ]
  }
}
