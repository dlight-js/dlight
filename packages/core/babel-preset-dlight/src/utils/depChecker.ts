import { type BabelPath } from "../types"
import * as t from "@babel/types"

export const escapeNamings = ["escape", "$"]

/**
 * @brief Check if it's the left side of an assignment expression, e.g. this.count = 1
 * @param innerPath
 * @returns is left side of an assignment expression
 */
export function isAssignmentExpressionLeft(innerPath: BabelPath): boolean {
  const parentNode = innerPath.parentPath.node
  return (
    (t.isAssignmentExpression(parentNode) && parentNode.left === innerPath.node) ||
    t.isUpdateExpression(parentNode)
  )
}

/**
 * @brief Check if a member expression is the right side of an assignment expression
 *   e.g. this.count = this.count + 1
 * @param innerPath
 * @returns is the right side of an assignment expression
 */
export function isAssignmentExpressionRight(innerPath: BabelPath, classDeclarationNode?: t.ClassDeclaration | t.ClassExpression): boolean {
  const currNode = innerPath.node
  let isRightExp = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    if (t.isAssignmentExpression(reversePath.node)) {
      const leftNode = reversePath.node.left
      const typeEqual = currNode.type === leftNode.type
      const identifierEqual = currNode.property.name === leftNode.property.name
      isRightExp = typeEqual && identifierEqual
    }
    reversePath = reversePath.parentPath
  }

  return isRightExp
}

/**
 * @brief Check if it's in an "escape" function,
 *        e.g. escape(() => { console.log(this.count) })
*              deps will be empty instead of ["count"]
 * @param innerPath
 * @param classDeclarationNode
 * @returns is in escape function
 */
export function isMemberInEscapeFunction(innerPath: BabelPath, classDeclarationNode?: t.ClassDeclaration | t.ClassExpression): boolean {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    if (
      t.isCallExpression(node) &&
      t.isIdentifier(node.callee) &&
      escapeNamings.includes(node.callee.name)
    ) {
      isInFunction = true
      break
    }
    reversePath = reversePath.parentPath
  }

  return isInFunction
}

/**
 * @brief Check if it's in a "manual" function,
 *        e.g. manual(() => { console.log(this.count) }, ["flag"])
 *             deps will be ["flag"] instead of ["count"]
 * @param innerPath
 * @param classDeclarationNode
 * @returns is in manual function
 */
export function isMemberInManualFunction(innerPath: BabelPath, classDeclarationNode?: t.ClassDeclaration | t.ClassExpression): boolean {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    const parentNode = reversePath.parentPath?.node
    const isFunction = t.isFunctionExpression(node) || t.isArrowFunctionExpression(node)
    const isManual = (
      t.isCallExpression(parentNode) &&
      t.isIdentifier(parentNode.callee) &&
      parentNode.callee.name === "manual"
    )
    if (isFunction && isManual) {
      isInFunction = true
      break
    }
    reversePath = reversePath.parentPath
  }

  return isInFunction
}
