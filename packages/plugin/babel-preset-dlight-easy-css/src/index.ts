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

interface EasyCssOption {
  entryFile: string
  utilities?: Array<{
    easyFuncMap: Record<string, ((...args: any) => string)>
    safeName?: string
  }>
}

export default function(api: any, options: EasyCssOption) {
  return {
    plugins: [
      [syntaxTypescript.default ?? syntaxTypescript, { isTSX: true }],
      syntaxDoExpressions.default ?? syntaxDoExpressions,
      syntaxJsx.default ?? syntaxJsx,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [easyCss.default ?? easyCss, options]
    ]
  }
}
