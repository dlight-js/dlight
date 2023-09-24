import {
  arrowFunctionPropertyToMethod,
  isMemberExpressionProperty,
  isObjectKey
} from "./nodeHelper"
import * as t from "@babel/types"
import parseBody from "./parser"
import { type IdDepsArr, resolveParserNode } from "./bodyGenerator"

export function handleBodyFunc(node: t.ClassMethod, depChain: string[], subViews: string[], path: any, isSubView = false) {
  let newBody, usedProperties

  const nodeList = [...node.body.directives, ...node.body.body]
  if (isSubView) {
    const param = node.params[0]
    if (!param || !t.isObjectPattern(param)) {
      const parsedBody = resolveParserNode(path, parseBody(nodeList, path), depChain, subViews)
      newBody = parsedBody.code
      usedProperties = parsedBody.useProperties
    } else {
      const propNames: string[] = param.properties.map((p: any) => p.key.name)
      /**
       * `...(${propName}?.deps ?? [])
       */
      const idDepsArr: IdDepsArr = propNames.map(propName => ({
        ids: [propName],
        propNames: ([
          t.arrayExpression([
            t.spreadElement(
              t.logicalExpression(
                "??",
                t.optionalMemberExpression(
                  t.identifier(propName),
                  t.identifier("deps"),
                  false,
                  true
                ),
                t.arrayExpression()
              )
            )
          ]).elements[0]
        ]) as any
      }))
      const parsedBody = resolveParserNode(path, parseBody(nodeList, path), depChain, subViews, idDepsArr)
      newBody = parsedBody.code
      usedProperties = parsedBody.useProperties
    }
  } else {
    const parsedBody = resolveParserNode(path, parseBody(nodeList, path), depChain, subViews)
    newBody = parsedBody.code
    usedProperties = parsedBody.useProperties
  }
  node.body = newBody

  return usedProperties
}

export function handleSubView(view: t.ClassMethod, path: any) {
  const param = view.params[0]
  if (!param || !t.isObjectPattern(param)) return
  const props: string[] = []
  for (const property of param.properties) {
    const name = (property as any).key.name
    props.push(name)
    // ---- 如果是 {a=1} 这种有赋值的情况
    if (t.isAssignmentPattern((property as any).value)) {
      (property as any).value.right = t.objectExpression(
        [t.objectProperty(
          t.identifier("value"),
          (property as any).value.right
        ),
        t.objectProperty(
          t.identifier("deps"),
          t.arrayExpression()
        )]
      )
    }
  }
  // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
  //      因为没有办法直接遍历BlockStatement，又不能遍历带有参数的，所以只能用function包一层
  path.scope.traverse(t.functionDeclaration(null, [], view.body), {
    Identifier(path: any) {
      if (props.includes(path.node.name) &&
          !isMemberExpressionProperty(path.parentPath.node, path.node) &&
          !isObjectKey(path.parentPath.node, path.node)
      ) {
        /**
         * ${path.node.name}?.value
         */
        path.replaceWith(
          t.optionalMemberExpression(
            t.identifier(path.node.name),
            t.identifier("value"),
            false,
            true
          )
        )
        path.skip()
      }
    }
  })
}

export function handleBody(classBodyNode: t.ClassBody, depChain: string[], path: any) {
  const usedProperties: string[] = []
  let body: undefined | t.Node
  const views: any[] = []
  for (const c of classBodyNode.body) {
    if (!(
      t.isClassMethod(c) ||
      (t.isClassProperty(c) && (
        t.isArrowFunctionExpression(c.value) ||
        (t.isTSAsExpression(c.value) && t.isArrowFunctionExpression(c.value.expression))
      ))
    )) continue

    const isSubView = (c as any).decorators?.find((d: any) =>
      t.isIdentifier(d.expression) && d.expression.name === "View"
    )
    const isBody = (c as any).key.name === "Body"
    if (!isSubView && !isBody) continue

    if (t.isClassProperty(c)) {
      if (t.isTSAsExpression(c.value)) c.value = c.value.expression
      arrowFunctionPropertyToMethod(c)
    }

    if (isSubView) {
      (c as any).decorators = null
      views.push(c)
    }
    body = c
  }
  const subViews: string[] = views.map(v => v.key.name)
  for (const view of views) {
    handleSubView(view, path)
    usedProperties.push(...handleBodyFunc(view, depChain, subViews, path, true))
  }
  usedProperties.push(...handleBodyFunc(body as any, depChain, subViews, path))

  return usedProperties
}
