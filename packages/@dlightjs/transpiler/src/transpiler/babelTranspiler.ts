// @ts-expect-error no type
import * as Babel from "@babel/core"
// @ts-expect-error no type
import generator from "@babel/generator"

export default {
  traverse: Babel.traverse,
  generate: (ast: any) => generator(ast).code,
  parse: (code: string) => Babel.parse(code, {
    plugins: [
      ["@babel/plugin-syntax-typescript"],
      "@babel/plugin-syntax-do-expressions",
      ["@babel/plugin-syntax-decorators", { legacy: true }]
    ]
  })
}
