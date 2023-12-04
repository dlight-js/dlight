import * as t from "@babel/types"
import { type BabelPath } from "../types"

/**
  * @brief Wrap the value with a variable declaration
  * const _ = ${value}
  * @param value
  * @returns wrapped value
  */
export function valueWrapper(value: t.Node): t.VariableDeclaration {
  return t.variableDeclaration("const", [t.variableDeclarator(t.identifier("_"), value as any)])
}

/**
 * @brief check if the identifier is from a function param till the stopNode
 *  e.g:
 *  function myFunc1(ok) { // stopNode = functionBody
 *     const myFunc2 = ok => ok // from function param
 *     console.log(ok) // not from function param
 *  }
 */
export function isAttrFromFunction(path: BabelPath, idName: string, stopNode: t.Node) {
  let reversePath = path.parentPath

  function checkParam(param: any): boolean {
    // ---- 3 general types:
    //      * represent allow nesting
    // ---0 Identifier: (a)
    // ---1 RestElement: (...a)   *
    // ---1 Pattern: 3 sub Pattern
    // -----0   AssignmentPattern: (a=1)   *
    // -----1   ArrayPattern: ([a, b])   *
    // -----2   ObjectPattern: ({a, b})
    if (t.isIdentifier(param)) return param.name === idName
    if (t.isAssignmentPattern(param)) return checkParam(param.left)
    if (t.isArrayPattern(param)) {
      return param.elements.map((el) => checkParam(el)).includes(true)
    }
    if (t.isObjectPattern(param)) {
      return param.properties
        .map((prop: any) => prop.key.name)
        .includes(idName)
    }
    if (t.isRestElement(param)) return checkParam(param.argument)

    return false
  }

  while (reversePath && reversePath.node !== stopNode) {
    const node = reversePath.node
    if (t.isArrowFunctionExpression(node) || t.isFunctionDeclaration(node)) {
      for (const param of node.params) {
        if (checkParam(param)) return true
      }
    }
    reversePath = reversePath.parentPath
  }
  if (t.isClassMethod(stopNode)) {
    for (const param of stopNode.params) {
      if (checkParam(param)) return true
    }
  }
  return false
}
