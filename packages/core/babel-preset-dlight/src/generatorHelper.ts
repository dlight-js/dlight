import * as t from "@babel/types"
import { type IdDepsArr } from "./bodyGenerator"
import { shouldBeListened, isMemberExpressionProperty, isObjectKey } from "./nodeHelper"
import { type ParserNode, isAHtmlTag } from "@dlightjs/view-parser"

export function isHTMLTag(parserNode: ParserNode) {
  const tag = parserNode.tag as any
  if (typeof tag === "string") return false
  if (t.isIdentifier(tag) && isAHtmlTag((tag).name)) {
    parserNode.tag = t.stringLiteral((tag).name) as any
    return true
  }
  if (t.isCallExpression((tag)) && (tag.callee as any).name === "htmlTag") {
    parserNode.tag = tag.arguments[0] as any
    return true
  }
  return false
}

export function isSubViewTag(subViews: string[], parserNode: ParserNode) {
  const tag = parserNode.tag as t.Node
  if (!t.isMemberExpression(tag) || !t.isThisExpression(tag.object)) return false
  if (subViews.includes((tag.property as any).name)) return true
  return false
}

export function parseCustomTag(parserNode: ParserNode) {
  const tag = parserNode.tag as any
  if (typeof tag === "string") return false
  // ---- 碰到名字叫tag，可以嵌套：tag(MyTagList[100].getTag())().height(100)
  if (t.isCallExpression(tag) && (tag.callee as any).name === "tag") {
    parserNode.tag = tag.arguments[0] as any
    return true
  }
}

export function isTagName(parserNode: ParserNode, name: string) {
  return t.isIdentifier(parserNode.tag as any) && (parserNode.tag as any).name === name
}

export function uid() {
  return Math.random().toString(20).slice(2, 8)
}

export function valueWrapper(value: t.Node) {
  return t.variableDeclaration("const", [t.variableDeclarator(t.identifier("_"), value as any)])
}

export function geneDeps(path: any, value: t.Node, depChain: string[], otherDeps: t.StringLiteral[] = []) {
  let deps: t.StringLiteral[] = []
  path.scope.traverse(valueWrapper(value),
    {
      MemberExpression(innerPath: any) {
        if (
          depChain.includes(innerPath.node.property.name) &&
          t.isThisExpression(innerPath.node.object) &&
          shouldBeListened(innerPath)
        ) {
          deps.push(t.stringLiteral(innerPath.node.property.name))
        }
      }
    })
  deps = [...new Set([...deps, ...otherDeps])]

  return deps
}

// ---- 只给for的解构用
export function geneIdDeps(path: any, value: t.Node, arr: IdDepsArr, otherDeps: t.StringLiteral[] = []) {
  let deps: t.Node[] = []
  path.scope.traverse(valueWrapper(value), {
    Identifier(innerPath: any) {
      for (const { ids, propNames } of arr) {
        if (ids.includes(innerPath.node.name)) {
          deps.push(...propNames)
        }
      }
    }
  })
  deps = [...new Set([...deps, ...otherDeps])]

  return deps
}

export function getIdentifiers(value: t.Node, path: any) {
  const identifiers: string[] = []
  path.scope.traverse(value, {
    Identifier(innerPath: any) {
      if (innerPath.node.name === "_") return
      identifiers.push(innerPath.node.name)
    }
  })
  return [...new Set(identifiers)]
}

export function getForBodyIdentifiers(path: any, item: t.Node) {
  if (t.isIdentifier(item)) return [item.name]
  const identifierKeys: string[] = []
  path.scope.traverse(item, {
    Identifier(innerPath: any) {
      if (t.isObjectProperty(innerPath.parentPath.node)) return
      identifierKeys.push(innerPath.node.name)
    },
    ObjectProperty(innerPath: any) {
      identifierKeys.push(innerPath.node.value.name)
    }
  })
  return [...new Set(identifierKeys)]
}

export function resolveForBody(path: any, body: t.BlockStatement, item: t.Node, valueItemStr: string) {
  const identifierKeys = getForBodyIdentifiers(path, item)
  // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
  path.scope.traverse(t.functionDeclaration(null, [], body), {
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
}

export function isTwoWayConnected(value: t.Node) {
  return t.isMemberExpression(value) && t.isThisExpression(value.object) && t.isIdentifier(value.property)
}

export function isOnlyMemberExpression(value: t.MemberExpression) {
  if (!t.isMemberExpression(value)) return false
  while (value.property) {
    if (!t.isMemberExpression(value.property) &&
      !t.isIdentifier(value.property)) {
      return false
    }
    value = value.property as any
  }
  return true
}

export function isAddDepsFunction(n: t.Node) {
  return (
    t.isExpressionStatement(n) &&
    t.isCallExpression(n.expression) &&
    t.isMemberExpression(n.expression.callee) &&
    t.isThisExpression(n.expression.callee.object) &&
    t.isIdentifier(n.expression.callee.property) &&
    n.expression.callee.property.name === "_$addDeps"
  )
}
