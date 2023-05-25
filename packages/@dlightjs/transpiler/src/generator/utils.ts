import Transpiler from "../transpiler/babelTranspiler"
import * as t from "@babel/types"
import { isMemberExpressionProperty, isMemberInFunction, isObjectKey, shouldBeListened } from "../transpiler/nodeHelper"

export function geneDepsStr(listenDeps: string[]) {
  return "[" + listenDeps.map(v => {
    if (v.startsWith("...")) {
      return v
    }
    return "\"" + v + "\""
  }).join(", ") + "]"
}

export function uid() {
  return Math.random().toString(20).slice(2, 8)
}

export function geneDeps(valueStr: string, depChain: string[], otherDeps: string[] = []) {
  const ast = Transpiler.parse(`(${valueStr})`)
  let deps: string[] = []
  Transpiler.traverse(ast, {
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
export function geneIdDeps(valueStr: string, arr: Array<{ ids: string[], propNames: string[] }>, otherDeps: string[] = []) {
  const ast = Transpiler.parse(`(${valueStr})`)
  let deps: string[] = []
  Transpiler.traverse(ast, {
    Identifier(innerPath: any) {
      for (const { ids, propNames } of arr) {
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
  const ast = Transpiler.parse(`(${valueStr})`)
  return t.isMemberExpression(ast.program.body[0].expression)
}

export function resolveForBody(bodyStr: string, item: string, valueItemStr: string) {
  const identifierKeys: string[] = []
  // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
  const itemAst = Transpiler.parse(item)
  Transpiler.traverse(itemAst, {
    Identifier(innerPath: any) {
      identifierKeys.push(innerPath.node.name)
    }
  })
  const bodyAst = Transpiler.parse(`function tempFunc() {${bodyStr}}`)!
  Transpiler.traverse(bodyAst, {
    Identifier(innerPath: any) {
      // ---- 必须key相等，但是不能是 xxx.keyname，也就是不是memberExpression
      //      但可以是 keyname.xxx 或者 xxx[keyname] -> computed = true
      if (identifierKeys.includes(innerPath.node.name) &&
                !isMemberExpressionProperty(innerPath.parentPath.node, innerPath.node) &&
                !isObjectKey(innerPath.parentPath.node, innerPath.node)
      ) {
        const valueNode = t.memberExpression(
          t.identifier(valueItemStr),
          t.identifier(innerPath.node.name)
        )
        innerPath.replaceWith(valueNode)
        innerPath.skip()
      }
    }
  })
  return Transpiler.generate((bodyAst.program.body[0]).body).trim().replace(/(^\{)|(\}$)/g, "")
}

export function isElementFunction(str: string) {
  const ast = Transpiler.parse(`let _ = ${str}`)!.program.body[0].declarations[0].init
  return !!(t.isArrowFunctionExpression(ast) || t.isFunctionExpression(ast))
}
