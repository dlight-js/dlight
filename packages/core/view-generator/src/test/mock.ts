import babelApi, { parseSync, types as t } from "@babel/core"
import { parseView, type ViewParserConfig } from "@dlightjs/view-parser"
import { parseReactivity, type ReactivityParserConfig } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig } from "../types"
import { generateView } from ".."
import generate from "@babel/generator"
import { expect } from "vitest"

const htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]
const subviewNames = ["MySubview", "InnerButton"]

export const availableProperties = ["flag", "count", "doubleCount", "array", "state1", "state2", "state3", "state4"]
const dependencyMap = {
  count: ["flag"],
  doubleCount: ["count", "flag"],
  array: ["count", "flag"],
  state1: ["count", "flag"],
  state2: ["count", "flag", "state1"],
  state3: ["count", "flag", "state1", "state2"],
  state4: ["count", "flag", "state1", "state2", "state3"]
}

const className = "MyComp"

const importMap = Object.fromEntries(([
  "createTemplate",
  "setStyle",
  "setDataset",
  "setMemorizedEvent",
  "setHTMLProp",
  "setHTMLAttr",
  "setHTMLProps",
  "setHTMLAttrs",
  "insertNode",
  "createElement",
  "ForNode",
  "IfNode",
  "EnvNode",
  "createTextNode",
  "updateText"
]).map((funcName, idx) => (
  [funcName, funcName]
)))

const viewConfig: ViewParserConfig = {
  babelApi,
  htmlTags,
  subviewNames
}

const reactivityConfig: ReactivityParserConfig = {
  babelApi,
  availableProperties,
  dependencyMap
}

const viewGeneratorConfig: ViewGeneratorConfig = {
  babelApi,
  className,
  importMap
}

export function parse(code: string) {
  const statements = (parseSync(`function code() {${code}}`)!.program.body[0] as t.FunctionDeclaration).body
  const viewUnits = parseView(statements, viewConfig)
  const reactivityUnits = parseReactivity(viewUnits, reactivityConfig)[0]

  return generateView(reactivityUnits, viewGeneratorConfig)
}

export function expectCompare(block: t.Node, target: string) {
  return expect(
    generate(babelApi.parse(generate(block).code)!).code
  ).toBe(generate(babelApi.parse(target)!).code)
}

export function expectBlock(block: t.BlockStatement, target: string) {
  return expect(
    generate(babelApi.parse(
      generate(t.functionDeclaration(t.identifier("temp"), [], block)).code
    )!).code
  ).toBe(generate(babelApi.parse(`function temp() { ${target} }`)!).code)
}
