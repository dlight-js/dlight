
import * as t from "@babel/types";
import { uid } from "../generator/utils";
import Transpiler from "../transpiler"

const commentRegex = /(\/\*[\S\s]*\*\/)|(\/\/.*)/g

export function alterBody(fileCode: string) {
    const bodyMap: {[key:string]: string} = {}
    const ast = Transpiler.parse.all(fileCode)
    Transpiler.traverse(ast, {
        ClassProperty(path: any) {
            if (path.node.key.name === "Body") {
                const id = uid()
                bodyMap[id] = Transpiler.generate(path.node.value).replace(commentRegex, "")
                path.node.value = t.stringLiteral(id)
            }
        }
    })
    const code = Transpiler.generate(ast)

    return {code, bodyMap}
}