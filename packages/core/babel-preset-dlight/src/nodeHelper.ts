import * as t from "@babel/types"

export function pushDerived(name: string, deps: string[], propDerivedNode: t.ClassProperty, classBodyNode: t.ClassBody) {
  if (!classBodyNode.body.includes(propDerivedNode)) {
    classBodyNode.body.unshift(propDerivedNode)
  }
  (propDerivedNode as any).value.properties.unshift(
    t.objectProperty(
      t.identifier(name),
      t.arrayExpression(deps.map(dep => t.stringLiteral(dep)))
    )
  )
}

export function pushDep(name: string, depsNode: t.ClassProperty, classBodyNode: t.ClassBody) {
  if (!classBodyNode.body.includes(depsNode)) {
    classBodyNode.body.unshift(depsNode)
  }
  if ((depsNode as any).value.properties.map((p: any) => p.key.name).includes(name)) return
  (depsNode as any).value.properties.unshift(
    t.objectProperty(
      t.identifier(name),
      t.newExpression(t.identifier("Set"), [])
    )
  )
}

export const escapeArray = ["escape", "$"]

export function isMemberInEscapeFunction(innerPath: any, classDeclarationNode?: t.Node) {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    if (t.isCallExpression(node) && t.isIdentifier(node.callee) && escapeArray.includes(node.callee.name)) {
      isInFunction = true
      break
    }
    reversePath = reversePath.parentPath
  }

  return isInFunction
}

export function isMemberInManualFunction(innerPath: any, classDeclarationNode?: t.Node) {
  let isInFunction = false
  let reversePath = innerPath.parentPath
  while (reversePath && reversePath.node !== classDeclarationNode) {
    const node = reversePath.node
    const parentNode = reversePath.parentPath?.node
    if ((t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) &&
      t.isCallExpression(parentNode) && t.isIdentifier(parentNode.callee) && parentNode.callee.name === "manual"
    ) {
      isInFunction = true
      break
    }
    reversePath = reversePath.parentPath
  }

  return isInFunction
}

export function isAssignmentExpressionLeft(innerPath: any) {
  // ---- 判断是不是 this.count = 1 的情况
  const parentNode = innerPath.parentPath.node
  return t.isAssignmentExpression(parentNode) && parentNode.left === innerPath.node
}

export function isAssignmentExpressionRight(innerPath: any, classDeclarationNode?: t.Node) {
  // ---- 判断是不是 this.count = this.count + 1 的情况
  //      因为有可能无限嵌套 this.count = function(){return this.count}.call(this) 这种情况所以
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

export function shouldBeListened(innerPath: any, classDeclarationNode?: t.Node) {
  return (
    !isMemberInManualFunction(innerPath, classDeclarationNode) &&
    !isMemberInEscapeFunction(innerPath, classDeclarationNode) &&
    !isAssignmentExpressionLeft(innerPath) &&
    !isAssignmentExpressionRight(innerPath, classDeclarationNode))
}

export function valueWithArrowFunc(node: any) {
  node.value = t.arrowFunctionExpression([], node.value)
}

export function isMemberExpressionProperty(parentNode: t.Node, currentNode: t.Node) {
  return t.isMemberExpression(parentNode) && !parentNode.computed && parentNode.property === currentNode
}

export function isObjectKey(parentNode: t.Node, currentNode: t.Node) {
  return t.isObjectProperty(parentNode) && parentNode.key === currentNode
}

export function bindMethods(classBodyNode: t.ClassBody, methodsToBind: string[]) {
  if (methodsToBind.length === 0) return
  classBodyNode.body.unshift(t.classMethod(
    "constructor",
    t.identifier("constructor"),
    [],
    t.blockStatement([
      t.expressionStatement(t.callExpression(t.super(), [])),
      ...methodsToBind.map(methodName => (
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.memberExpression(
              t.thisExpression(),
              t.identifier(methodName)
            ),
            t.callExpression(
              t.memberExpression(
                t.memberExpression(
                  t.thisExpression(),
                  t.identifier(methodName)
                ),
                t.identifier("bind")
              ),
              [t.thisExpression()]
            )
          )
        )
      ))
    ])
  ))
}

export function isDLightView(path: any) {
  const node = path.node
  const decorators = node.decorators ?? []
  const isDecorator = decorators.find((deco: t.Decorator) => t.isIdentifier(deco.expression, { name: "View" }))
  if (isDecorator) {
    node.superClass = t.identifier("View")
    node.decorators = node.decorators?.filter((deco: t.Decorator) => (
      !t.isIdentifier(deco.expression, { name: "View" })
    ))
  }

  return t.isIdentifier(node.superClass, { name: "View" })
}

export function arrowFunctionPropertyToMethod(propertyNode: t.ClassProperty) {
  const propertyBody = (propertyNode.value as t.ArrowFunctionExpression).body
  const body = t.isExpression(propertyBody) ? t.blockStatement([t.returnStatement(propertyBody)]) : propertyBody
  propertyNode.type = "ClassMethod" as any
  (propertyNode as any).body = body
  ;(propertyNode as any).kind = "method"
  ;(propertyNode as any).params = (propertyNode.value as t.ArrowFunctionExpression).params
  propertyNode.value = null
}
