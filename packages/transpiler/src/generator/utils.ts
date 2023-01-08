// @ts-ignore
import babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import babelTraverse from "@babel/traverse"
import * as t from "@babel/types"
import {isMemberInFunction} from "../babel/nodeHelper";
const parse = babel.parse
const traverse = babelTraverse.default


export function geneDepsStr(listenDeps: string[]) {
    return "[" + listenDeps.map(v=>"\""+v+"\"").join(", ") + "]"
}

export function uid() {
    return Math.random().toString(20).slice(2)
}

export function geneDeps(valueStr: string, derivedArr: string[]) {
    const ast = parse(valueStr)
    let deps: string[] = []
    traverse(ast, {
        MemberExpression(innerPath: any) {
            if (derivedArr.includes(innerPath.node.property.name)) {
                if (!isMemberInFunction(innerPath)) {
                    deps.push(innerPath.node.property.name)
                }
            }
        }
    })
    deps = [...new Set(deps)]

    return deps
}


export function geneIsTwoWayConnected(valueStr: string) {
    const ast = parse(valueStr)
    return t.isMemberExpression(ast.program.body[0].expression)
}