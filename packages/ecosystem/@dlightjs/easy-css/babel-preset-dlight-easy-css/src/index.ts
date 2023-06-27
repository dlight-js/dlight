// @ts-ignore
import syntaxTypescript from "@babel/plugin-syntax-typescript"
// @ts-ignore
import syntaxDoExpressions from "@babel/plugin-syntax-do-expressions"
// @ts-ignore
import syntaxJsx from "@babel/plugin-syntax-jsx"
// @ts-ignore
import syntaxDecorators from "@babel/plugin-syntax-decorators"
// @ts-ignore
import easyCss from "babel-plugin-easy-css"
import dlightEasyCss from "./plugin"
import atomic from "@iandx/easy-css-atomic"
import utility from "@iandx/easy-css-utility"

export default function() {
  const options = {
    utilities: [{
      easyFuncMap: atomic,
      safeName: "dlightEasyCssAtomic"
    }, {
      easyFuncMap: utility,
      safeName: "dlightEasyCssUtility"
    }],
    easyCssAlias: "@dlightjs/easy-css"
  }
  return {
    plugins: [
      [syntaxTypescript.default ?? syntaxTypescript, { isTSX: true }],
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      syntaxJsx.default ?? syntaxJsx,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [easyCss, options],
      [dlightEasyCss, options]
    ]
  }
}
