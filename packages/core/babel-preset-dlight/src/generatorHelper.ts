import * as t from "@babel/types"
import { type IdDepsArr } from "./bodyGenerator"
import { shouldBeListened, isMemberExpressionProperty, isObjectKey } from "./nodeHelper"
import { type ViewParserUnit } from "./viewParser"

export const htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]

export function isAHtmlTag(key: string) {
  return htmlTags.includes(key)
}

export function isHTMLTag(viewParserUnit: ViewParserUnit) {
  const tag = viewParserUnit.tag as any
  if (typeof tag === "string") return false
  if (t.isIdentifier(tag) && isAHtmlTag((tag).name)) {
    viewParserUnit.tag = t.stringLiteral((tag).name) as any
    return true
  }
  if (t.isCallExpression((tag)) && (tag.callee as any).name === "htmlTag") {
    viewParserUnit.tag = tag.arguments[0] as any
    return true
  }
  return false
}

export function isSubViewTag(subViews: string[], viewParserUnit: ViewParserUnit) {
  const tag = viewParserUnit.tag as t.Node
  if (!t.isMemberExpression(tag) || !t.isThisExpression(tag.object)) return false
  if (subViews.includes((tag.property as any).name)) return true
  return false
}

export function parseCustomTag(viewParserUnit: ViewParserUnit) {
  const tag = viewParserUnit.tag as any
  if (typeof tag === "string") return false
  // ---- 碰到名字叫tag，可以嵌套：tag(MyTagList[100].getTag())().height(100)
  if (t.isCallExpression(tag) && (tag.callee as any).name === "tag") {
    viewParserUnit.tag = tag.arguments[0] as any
    return true
  }
}

export function isTagName(viewParserUnit: ViewParserUnit, name: string) {
  return t.isIdentifier(viewParserUnit.tag as any) && (viewParserUnit.tag as any).name === name
}

export function uid() {
  return Math.random().toString(20).slice(2, 8)
}

export function valueWrapper(value: t.Node) {
  return t.variableDeclaration("const", [t.variableDeclarator(t.identifier("_"), value as any)])
}

export function geneDeps(
  path: any,
  value: t.Node,
  depChain: string[],
  fullDepMap: Record<string, string[]>,
  otherDeps: t.StringLiteral[] = []
) {
  let deps: string[] = []
  path.scope.traverse(valueWrapper(value),
    {
      MemberExpression(innerPath: any) {
        if (
          depChain.includes(innerPath.node.property.name) &&
          t.isThisExpression(innerPath.node.object) &&
          shouldBeListened(innerPath)
        ) {
          // deps.push(t.stringLiteral(innerPath.node.property.name))
          const key = innerPath.node.property.name
          deps.push(key)
          deps.push(...(fullDepMap[key] ?? []))
        }
      }
    })
  deps = [...new Set([...deps])]

  return [...new Set([...deps.map(dep => t.stringLiteral(dep)), ...otherDeps])]
}

// ---- 只给for的解构用
export function geneIdDeps(
  path: any,
  value: t.Node,
  arr: IdDepsArr,
  otherDeps: t.StringLiteral[] = []
) {
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
