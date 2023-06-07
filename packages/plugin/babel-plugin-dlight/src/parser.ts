import * as t from "@babel/types"

function uid() {
  return Math.random().toString(32).slice(2)
}

export interface ParserNode {
  tag: t.Node | string
  attr: Record<string, any>
  children: ParserNode[]
}

function parseProp(key: string, propAst: any, path: any) {
  if (!propAst) return { key, value: true, nodes: {} }

  const nodes: Record<string, ParserNode[]> = {}
  path.scope.traverse(propAst, {
    DoExpression(path: any) {
      const node = path.node
      const id = uid()
      nodes[id] = parseBody(node.body.body, path)
      path.replaceWith(t.stringLiteral(id))
      path.skip()
    }
  })
  return {
    key,
    value: propAst,
    nodes
  }
}

function isPureMemberExpression(node: any) {
  // ---- 先剥掉一层
  while (node) {
    node = node.callee?.object
    if (t.isCallExpression(node)) {
      return false
    }
  }
  return true
}

function parseTag(node: t.CallExpression, path: any) {
  const parserNode: any = { tag: "", attr: { props: [] }, children: [] }
  let n = node

  // ---- 会存在.xxx()不知道是预期tag还是prop的情况，所有强制tag只能有一层
  //      比如 div().width(100) 默认用div
  //      第三个&&是排除this.subView()
  // ---- 由于callee是从外到内，所以最后一个循环的就是tag，其余都要加到prop里面
  while (n && (n.callee as t.MemberExpression)?.object && !isPureMemberExpression(n)) {
    // ---- 取第1个参数，如果参数是空，那就默认是true
    const prop = n.arguments[0]
    const key = ((n.callee as t.MemberExpression).property as t.Identifier).name
    parserNode.attr.props.unshift(parseProp(key, prop, path))
    // ---- 继续迭代直到变成tag在同一行
    n = (n.callee as t.MemberExpression).object as t.CallExpression
  }

  if (n.arguments.length > 0) {
    parserNode.attr.props.unshift(parseProp("_$content", n.arguments[0], path))
  }
  parserNode.tag = n.callee
  return parserNode
}

function parseText(node: t.StringLiteral | t.TemplateLiteral | t.DirectiveLiteral) {
  return { tag: "_$text", attr: { _$content: node }, children: [] }
}

function parseTaggedTemplate(node: t.TaggedTemplateExpression, path: any) {
  let taggedParserNodes = parseNode(node.tag, path)
  if (!Array.isArray(taggedParserNodes)) taggedParserNodes = [taggedParserNodes]
  const templateParserNode = {
    tag: "_$text",
    attr: { _$content: node.quasi },
    children: []
  }

  return [...taggedParserNodes, templateParserNode]
}

function parseNode(node: any, path: any): ParserNode | ParserNode[] {
  if (t.isCallExpression(node)) return parseTag(node, path)
  if (t.isStringLiteral(node) || t.isTemplateLiteral(node)) {
    return parseText(node)
  }

  if (t.isTaggedTemplateExpression(node)) return parseTaggedTemplate(node, path)

  return {} as any
}

function parseFor(node: t.ForOfStatement, path: any): ParserNode {
  const item = (node.left as any).declarations[0].id
  const array = node.right
  const parserNode: ParserNode = {
    tag: "for",
    attr: { item, array },
    children: []
  }
  let childrenNodes = (node.body as any).body
  if (childrenNodes.length === 0) {
    parserNode.children = []
  } else {
    if (t.isArrayExpression(childrenNodes[0].expression)) {
      parserNode.attr.key = childrenNodes[0].expression.elements[0]
      childrenNodes = childrenNodes.slice(1)
    }
    parserNode.children = parseBlock(childrenNodes, path)
  }

  return parserNode
}

function parseIf(node: any, path: any): ParserNode {
  const conditions = parseIfConditions(node, path)
  return {
    tag: "if",
    attr: { conditions },
    children: []
  }
}

function parseIfConditions(node: any, path: any) {
  const conditions: Array<{ condition: any, parserNodes: ParserNode[] }> = []
  const condition = node.test
  const parserNodes = parseBlock(node.consequent.body, path)
  conditions.push({ condition, parserNodes })
  if (t.isIfStatement(node.alternate)) {
    conditions.push(...parseIfConditions(node.alternate, path))
  } else if (node.alternate) {
    conditions.push({
      condition: t.booleanLiteral(true),
      parserNodes: parseBlock(node.alternate.body, path)
    })
  }

  return conditions
}

export function parseBlock(nodes: any, path: any): ParserNode[] {
  const children = []
  for (const node of nodes) {
    if (t.isExpressionStatement(node)) {
      let parserNodes: any = parseNode(node.expression, path)
      if (!Array.isArray(parserNodes)) parserNodes = [parserNodes]
      children.push(...parserNodes)
    } else if (t.isBlockStatement(node)) {
      children[children.length - 1].children = parseBlock(node.body, path)
    } else if (t.isForOfStatement(node)) {
      children.push(parseFor(node, path))
    } else if (t.isIfStatement(node)) {
      children.push(parseIf(node, path))
    } else if (t.isDirective(node)) {
      children.push(parseText(node.value))
    }
  }
  return children
}

function parseBody(nodes: any, path: any) {
  return parseBlock(nodes, path)
}

export default parseBody
