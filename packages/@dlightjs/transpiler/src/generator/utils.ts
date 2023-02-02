// @ts-ignore
import * as babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import traverse from "@babel/traverse"

import * as t from "@babel/types"
import {isMemberInFunction, shouldBeListened} from '../babel/nodeHelper';
const parse = (code: string) => babel.parse(code, babelConfig)
const generate = (ast: any) => babelGenerate(ast).code


const babelConfig = {
    filename: "*.ts",
    presets: ["@babel/preset-typescript"]
}

export function geneDepsStr(listenDeps: string[]) {
    return "[" + listenDeps.map(v=>"\""+v+"\"").join(", ") + "]"
}

export function uid() {
    return Math.random().toString(20).slice(2, 8)
}

export function geneDeps(valueStr: string, depChain: string[], otherDeps: string[]=[]) {
    const ast = parse(`(${valueStr})`)
    let deps: string[] = []
    traverse(ast, {
        MemberExpression(innerPath: any) {
            if (depChain.includes(innerPath.node.property.name)) {
                if (shouldBeListened(innerPath)) {
                    deps.push(innerPath.node.property.name)
                }
            }
        }
    })
    deps = [...new Set([...deps, ...otherDeps])]

    return deps
}

// ---- 只给for的解构用
export function geneIdDeps(valueStr: string, arr: {ids: string[], propNames: string[]}[], otherDeps: string[]=[]) {
    const ast = parse(`(${valueStr})`)
    let deps: string[] = []
    traverse(ast, {
        Identifier(innerPath: any) {
            for (let {ids, propNames} of arr) {
                if (ids.includes(innerPath.node.name)) {
                    // ---- 这里不会遇到赋值的情况，所以只要判断在不在function里面就行
                    if (!isMemberInFunction(innerPath)) {
                        deps.push(...propNames)
                    }
                }
            }
            
        }
    })
    deps = [...new Set([...deps, ...otherDeps])]

    return deps
}

export function getIdentifiers(valueStr: string) {
    return valueStr.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g) ?? []
}

export function geneIsTwoWayConnected(valueStr: string) {
    const ast = parse(`(${valueStr})`)
    return t.isMemberExpression(ast.program.body[0].expression)
}

export function resolveForBody(bodyStr: string, item: string) {
    let identifierKeys: string[] = []
    // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
    const itemAst = parse(item)
    traverse(itemAst, {
        Identifier(innerPath: any) {
            identifierKeys.push(innerPath.node.name)
        }
    })
    const bodyAst = parse(`function tempFunc() {${bodyStr}}`)
    traverse(bodyAst, {
        Identifier(innerPath: any) {
            // ---- 必须key相等，但是不能是 xxx.keyname，也就是不是memberExpreesion
            if (identifierKeys.includes(innerPath.node.name) &&
                !t.isMemberExpression(innerPath.parentPath.node)) {
                const valueNode = t.memberExpression(
                    t.identifier("_$valuedItem"),
                    t.identifier(innerPath.node.name)
                )
                innerPath.replaceWith(valueNode)
                innerPath.skip()
            }
        }
    })
    return generate(bodyAst.program.body[0].body).trim().replace(/(^\{)|(\}$)/g, "")
}