// @ts-ignore
import * as babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import traverse from "@babel/traverse"
import * as t from "@babel/types";
import { uid } from "../generator/utils";


const babelConfig = {
    filename: "*.jsx",
    presets: ["@babel/preset-react",  "@babel/preset-typescript"],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
}
const parse = (code: string) => babel.parse(code, babelConfig)
const generate = (ast: any) => babelGenerate(ast).code



export function alterBody(fileCode: string) {
    const bodyMap: {[key:string]: string} = {}
    const ast = parse(fileCode)
    traverse(ast, {
        ClassProperty(path: any) {
            if (path.node.key.name === "Body") {
                const id = uid()
                bodyMap[id] = generate(path.node.value)
                path.node.value = t.stringLiteral(id)
            }
        }
    })
    const code = generate(ast)

    return {code, bodyMap}
}