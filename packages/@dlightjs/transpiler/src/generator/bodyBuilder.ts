import { type ParserNode } from "../parser/ParserNode"

const htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"]

export function isHTMLTag(parserNode: ParserNode) {
  const htmlReg = /htmlTag\((.+)\)/
  if (htmlReg.test(parserNode.tag)) {
    parserNode.tag = parserNode.tag.replace(htmlReg, "$1")
    return true
  }
  if (htmlTags.includes(parserNode.tag)) {
    parserNode.tag = `"${parserNode.tag}"`
    return true
  }
  return false
}

export function parseCustomTag(parserNode: ParserNode) {
  const tagReg = /tag\((.+)\)/
  // ---- 碰到名字叫tag，可以嵌套：tag(MyTagList[100].getTag())().height(100)
  if (tagReg.test(parserNode.tag)) {
    parserNode.tag = parserNode.tag.replace(tagReg, "$1")
  }
}

export function newLine(value: string) {
  return `${value}\n`
}

export function geneChildNodesArray(parserNodes: ParserNode[]) {
  return "[" + parserNodes.map((parserNode: ParserNode, idx: number) => {
    // ---- 如果是class内部调用的，因为返回的是数组
    if (parserNode.attr.isSubView) return `..._$node${idx}`
    return `_$node${idx}`
  }).join(", ") + "]"
}

export class BodyStringBuilder {
  value: string = ""

  add(value: string) {
    this.value += newLine(value)
  }

  shift(value: string) {
    this.value = newLine(value) + this.value
  }

  addBody(body: BodyStringBuilder) {
    this.value += body.value
  }
}
