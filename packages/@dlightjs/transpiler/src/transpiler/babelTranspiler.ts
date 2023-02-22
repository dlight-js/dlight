// @ts-ignore
import * as Babel from "@babel/core"
// @ts-ignore
import generator from "@babel/generator"

export default {
    traverse: Babel.traverse,
    generate: (ast: any) => generator(ast).code,
    parse: (code: string) => Babel.parse(code, {
        plugins: [
            ["@babel/plugin-syntax-typescript", {isTSX: true}],
            "@babel/plugin-syntax-jsx",
            "@babel/plugin-syntax-do-expressions",
            ['@babel/plugin-syntax-decorators', { legacy: true }]
        ]
    })
}
