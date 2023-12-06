import { type NodePath, type types as t } from "@babel/core"

export const escapeNamings = ["escape", "$"]

/**
 * @brief Check if it's the left side of an assignment expression, e.g. this.count = 1
 * @param innerPath
 * @returns is left side of an assignment expression
 */
export function isAssignmentExpressionLeft(innerPath: NodePath, T: typeof t): boolean {
  const parentNode = innerPath.parentPath?.node

  return (
    (T.isAssignmentExpression(parentNode) && parentNode.left === innerPath.node) ||
    T.isUpdateExpression(parentNode)
  )
}

/**
 * @brief Check if a member expression is the right side of an assignment expression
 *   e.g. this.count = this.count + 1
 * @param innerPath
 * @returns is the right side of an assignment expression
 */
export function isAssignmentExpressionRight(innerPath: NodePath<t.MemberExpression>, classDeclarationNode: t.ClassDeclaration | t.ClassExpression, T: typeof t): boolean {
  const currNode = innerPath.node

  let isRightExp = false
  let reversePath: NodePath<t.Node> | null = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    if (T.isAssignmentExpression(reversePath.node)) {
      const leftNode = reversePath.node.left as t.MemberExpression
      const typeEqual = currNode.type === leftNode.type
      const identifierEqual = (currNode.property as t.Identifier).name === (leftNode.property as t.Identifier).name
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
export function isMemberInEscapeFunction(innerPath: NodePath, classDeclarationNode: t.ClassDeclaration | t.ClassExpression, T: typeof t): boolean {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    if (
      T.isCallExpression(node) &&
      T.isIdentifier(node.callee) &&
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
export function isMemberInManualFunction(innerPath: NodePath, classDeclarationNode: t.ClassDeclaration | t.ClassExpression, T: typeof t): boolean {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    const parentNode = reversePath.parentPath?.node
    const isFunction = T.isFunctionExpression(node) || T.isArrowFunctionExpression(node)
    const isManual = (
      T.isCallExpression(parentNode) &&
      T.isIdentifier(parentNode.callee) &&
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
