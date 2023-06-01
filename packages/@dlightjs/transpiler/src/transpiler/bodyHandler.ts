import {
  functionBlockStatement,
  isMemberExpressionProperty,
  isObjectKey
} from "./nodeHelper"
import * as t from "@babel/types"
import { resolveParserNode } from "../generator"
import Transpiler from "./babelTranspiler"
import parseJsdBody from "../parser/jsdParser"

export function handleBodyFunc(node: t.ClassMethod, depChain: string[], subViews: string[], isSubView = false) {
  let newBody, usedProperties

  const nodeList = [...node.body.directives, ...node.body.body]
  if (isSubView) {
    const param = node.params[0]
    if (!param || !t.isObjectPattern(param)) {
      const parsedBody = resolveParserNode(parseJsdBody(nodeList), depChain, subViews)
      newBody = parsedBody.code
      usedProperties = parsedBody.useProperties
    } else {
      const propNames: string[] = param.properties.map((p: any) => p.key.name)
      const idDepsArr = propNames.map(propName => ({ ids: [propName], propNames: [`...(${propName}?.deps ?? [])`] }))
      const parsedBody = resolveParserNode(parseJsdBody(nodeList), depChain, subViews, idDepsArr)
      newBody = parsedBody.code
      usedProperties = parsedBody.useProperties
    }
  } else {
    const parsedBody = resolveParserNode(parseJsdBody(nodeList), depChain, subViews)
    newBody = parsedBody.code
    usedProperties = parsedBody.useProperties
  }
  node.body = functionBlockStatement(`function tmp() { ${newBody} }`)

  return usedProperties
}

export function handleSubView(view: t.ClassMethod) {
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
  //      注意这里转换，view.body是blockStatement，自带括号
  const ast = Transpiler.parse(`function tmp() ${Transpiler.generate(view.body)}`)!
  Transpiler.traverse(ast, {
    Identifier(path: any) {
      if (props.includes(path.node.name) &&
                !isMemberExpressionProperty(path.parentPath.node, path.node) &&
                !isObjectKey(path.parentPath.node, path.node)
      ) {
        // t.memberExpression() optional参数失效，所以直接生成
        path.replaceWith(Transpiler.parse(`${path.node.name}?.value`)!.program.body[0].expression)
        path.skip()
      }
    }
  })
  view.body = ast.program.body[0].body
}

export function handleBody(classBodyNode: t.ClassBody, depChain: string[]) {
  const usedProperties: string[] = []
  let body: undefined | t.Node
  const views: any[] = []
  for (const c of classBodyNode.body) {
    if ((c as any).decorators?.find((d: any) =>
      t.isIdentifier(d.expression) && d.expression.name === "SubView"
    )) {
      (c as any).decorators = undefined
      views.push(c)
    } else if ((c as any).key.name === "Body") {
      body = c
    }
  }
  const subViews = views.map(v => "this." + (v).key.name)
  for (const view of views) {
    handleSubView(view)
    usedProperties.push(...handleBodyFunc(view, depChain, subViews, true))
  }
  usedProperties.push(...handleBodyFunc(body as any, depChain, subViews))

  return usedProperties
}
