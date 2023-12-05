import * as t from "@babel/types"
import { type BabelPath } from "./types"
import { valueWrapper } from "./utils/babelNode"
import { uid } from "./generatorHelper"

export interface ViewParserProp {
  value: t.Expression
  nodes: Record<string, ViewParserUnit[]>
}

export interface TextViewParserUnit {
  type: "text"
  content: t.Expression
}

export interface HTMLViewParserUnit {
  type: "html"
  tag: t.Expression
  content?: ViewParserProp
  props?: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
}

export interface CustomViewParserUnit {
  type: "custom"
  tag: t.Expression
  content?: ViewParserProp
  props?: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
}

export interface IfViewParserUnit {
  type: "if"
  conditions: IfCondition[]
}

export interface ForViewParserUnit {
  type: "for"
  item: t.LVal
  array: t.Expression
  key?: t.Expression
  children: ViewParserUnit[]
}

export interface ExpViewParserUnit {
  type: "exp"
  content: ViewParserProp
  props?: Record<string, ViewParserProp>
}

export interface EnvViewParserUnit {
  type: "env"
  props: Record<string, ViewParserProp>
  children?: ViewParserUnit[]
}

export type ViewParserUnit =
  TextViewParserUnit
  | HTMLViewParserUnit
  | IfViewParserUnit
  | ForViewParserUnit
  | ExpViewParserUnit
  | EnvViewParserUnit
  | CustomViewParserUnit

export interface IfCondition {
  condition: t.Expression
  body: ViewParserUnit[]
}

export class ViewParser {
  private readonly htmlTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]
  private readonly tagNameSymbol = "tag"
  private readonly htmlTagSymbol = "htmlTag"
  private readonly environmentTagSymbol = "env"
  private readonly expressionTagSymbol = "_"
  private readonly classRootPath: BabelPath
  private readonly statements: Array<t.Statement | t.Directive>
  private readonly viewParserResult: ViewParserUnit[] = []

  constructor(classRootPath: BabelPath, statements: Array<t.Statement | t.Directive>) {
    this.classRootPath = classRootPath
    this.statements = statements
  }

  /**
   * @brief Parse the statements
   * @returns
   */
  parse(): ViewParserUnit[] {
    this.statements.forEach(this.parseStatement.bind(this))
    return this.viewParserResult
  }

  /**
   * @brief Parse the statements
   * @returns
   */
  private parseStatement(statement: t.Statement | t.Directive): void {
    if (t.isExpressionStatement(statement)) return this.parseExpression(statement.expression)
    if (t.isForOfStatement(statement)) return this.parseFor(statement)
    if (t.isIfStatement(statement)) return this.parseIf(statement)
    if (t.isDirective(statement)) return this.parseText(statement.value)
    if (t.isBlockStatement(statement)) {
      // ---- If the statement is a block statement, treat it as last unit's children
      const lastViewParserUnit = this.viewParserResult[this.viewParserResult.length - 1]
      const type = lastViewParserUnit?.type
      if (!(type === "custom" || type === "html" || type === "env")) return
      lastViewParserUnit.children = parseView(this.classRootPath, statement.body)
    }
  }

  /**
   * @brief Parse the expression node
   *  CallExpression -> Tag
   *  StringLiteral/TemplateLiteral -> Text
   *  TaggedTemplateExpression -> Tag + Text / Exp
   * @param expression
   * @returns
   */
  private parseExpression(expression: t.Expression): void {
    if (t.isCallExpression(expression)) return this.parseTag(expression)
    if (t.isStringLiteral(expression) || t.isTemplateLiteral(expression)) return this.parseText(expression)
    if (t.isTaggedTemplateExpression(expression)) return this.parseTaggedTemplate(expression)

    // ---- Default ExpressionTag
    //      e.g. this.count -> _(this.count)
    this.viewParserResult.push({
      type: "exp",
      content: this.parseProp(expression)
    })
  }

  /**
   * @brief Parse if statement conditions
   * @param node
   * @returns
   */
  parseIfConditions(node: t.IfStatement): IfCondition[] {
    const conditions: IfCondition[] = []
    const condition = node.test
    const ifBody = t.isBlockStatement(node.consequent) ? node.consequent.body : [node.consequent]
    conditions.push({
      condition,
      body: parseView(this.classRootPath, ifBody)
    })

    // ---- If the alternate is an if statement, parse it recursively
    if (t.isIfStatement(node.alternate)) {
      conditions.push(...this.parseIfConditions(node.alternate))
    } else if (node.alternate) {
      const altBody = t.isBlockStatement(node.alternate) ? node.alternate.body : [node.alternate]
      conditions.push({
        condition: t.booleanLiteral(true),
        body: parseView(this.classRootPath, altBody)
      })
    }

    return conditions
  }

  /**
   * @brief Parse if statement with else if and else
   * @param node
   * @returns
   */
  parseIf(node: t.IfStatement): void {
    this.viewParserResult.push({
      type: "if",
      conditions: this.parseIfConditions(node)
    })
  }

  /**
   * @brief Parse for of loop
   * Only accept for of loop with variable declaration
   *  e.g. for (const item of array) {}
   * Key:
   *  1. If the first statement is an array expression and is not a null or undefined,
   *     treat the first element as the key.
   *     e.g. for (const { idx, item } of array) { [idx]; div(item) }
   *          key will be "idx"
   *  2. If the first statement is an array expression and is null or undefined, treat it as a non-keyed loop.
   *      e.g. for (const { item } of array) { [null]; div(item) }
   *          no specific key
   *  3. If the first statement is not an array expression, treat the item itself as the key.
   *      e.g. for (const item of array) { div(item) }
   *          key will be "item"
   * @param node
   */
  parseFor(node: t.ForOfStatement): void {
    const left = node.left
    if (!t.isVariableDeclaration(left)) {
      throw new Error(
        "Invalid syntax in DLight's View, only accepts variable declaration in for of loop"
      )
    }
    const item = left.declarations[0].id
    const array = node.right
    let key: t.Expression | undefined
    const forBody = node.body
    let forBodyStatements: Array<t.Statement | t.Directive>
    if (t.isExpressionStatement(forBody)) {
      // ---- If the for body is an expression statement, treat it as the only statement
      forBodyStatements = [forBody as t.Statement]
    } else if (t.isBlockStatement(forBody)) {
      const childNodes = forBody.body
      if (childNodes.length === 0) return
      const firstStatement = childNodes[0]
      if (
        t.isExpressionStatement(firstStatement) &&
        t.isArrayExpression(firstStatement.expression)
      ) {
        // ---- Treat the first array element inside the block statement as the key
        const keyNode = firstStatement.expression.elements[0]
        // ---- If the key is undefined or null, treat it as no key
        if (
          t.isExpression(keyNode) &&
          !(t.isNullLiteral(keyNode) ||
          (t.isIdentifier(keyNode) && keyNode.name === "undefined"))
        ) {
          key = keyNode
        }
        forBodyStatements = childNodes.slice(1)
      } else {
        // ---- If there's no specified key, use the item as the key
        key = JSON.parse(
          // ---- Object and Array in declaration and expression have different types
          //      declaration: ObjectPattern | ArrayPattern
          //      expression: ObjectExpression | ArrayExpression
          JSON.stringify(item)
            .replace(/ObjectPattern/g, "ObjectExpression")
            .replace(/ArrayPattern/g, "ArrayExpression")
        )
        forBodyStatements = childNodes
      }
    } else return

    // ---- Parse the for body statements
    this.viewParserResult.push({
      type: "for",
      item,
      array,
      key,
      children: parseView(this.classRootPath, forBodyStatements)
    })
  }

  /**
   * @brief Parse text node
   *  1. `text text`
   *  2. "text2 text2"
   * @param node
   */
  private parseText(node: t.StringLiteral | t.TemplateLiteral | t.DirectiveLiteral): void {
    if (t.isDirectiveLiteral(node)) node = t.stringLiteral(node.value)

    this.viewParserResult.push({
      type: "text",
      content: node
    })
  }

  /**
   * @brief Parse tagged template expression
   * Two tagged template expression cases
   *  1. type without call expressions
   *      e.g. i18n`any text`
   *        => exp: _(i18n`any text`)
   *  2. type with call expressions
   *      e.g. div()`any text`
   *        => type: div() + text: `any text`
   * @param node
   * @param path
   */
  private parseTaggedTemplate(node: t.TaggedTemplateExpression): void {
    if (this.isPureMemberExpression(node.tag)) {
      // ---- Case 1
      this.viewParserResult.push({
        type: "exp",
        content: this.parseProp(node)
      })
      return
    }

    // ---- Case 2
    this.parseExpression(node.tag)
    this.viewParserResult.push({
      type: "text",
      content: node.quasi
    })
  }

  /**
   * @brief Parse props in the type node
   * @param propNode
   * @returns ViewParserProp
   */
  private parseProp(propNode: t.Node | undefined): ViewParserProp {
    if (!t.isExpression(propNode)) {
      throw new Error(
        "Invalid syntax in DLight's View, only accepts expression as props"
      )
    }
    // ---- If there is no propNode, set the default prop as true
    if (!propNode) return { value: t.booleanLiteral(true), nodes: {} }

    // ---- Collect do expression nodes as DLProp
    const dlViewPropResult: Record<string, ViewParserUnit[]> = {}
    this.classRootPath.scope.traverse(
      valueWrapper(propNode), {
        DoExpression: (innerPath: BabelPath) => {
          const node = innerPath.node
          const id = uid()
          // ---- Parse the body of do expression as a new ViewParser
          dlViewPropResult[id] = parseView(innerPath, node.body.body)
          // ---- Replace the do expression with a id string literal
          const newNode = t.stringLiteral(id)
          if (node === propNode) {
            propNode = newNode
          }
          innerPath.replaceWith(newNode)
          innerPath.skip()
        }
      }
    )

    return {
      value: propNode,
      nodes: dlViewPropResult
    }
  }

  /**
   * @brief Parse the type node
   * @param node
   */
  private parseTag(node: t.CallExpression): void {
    const props: Record<string, any> = {}

    // ---- Keep iterating until the node has no call expression
    let n = node
    while (
      t.isMemberExpression(n?.callee) &&
      n?.callee?.object &&
      !this.isPureMemberExpression(n)
    ) {
      const property = n.callee.property
      if (
        !t.isIdentifier(property) ||
        !t.isCallExpression(n.callee.object)
      ) {
        throw new Error(
          "Invalid syntax in DLight's View, only accepts dot chain call expression"
        )
      }
      const key = property.name
      const prop = this.parseProp(n.arguments[0])
      props[key] = prop
      n = n.callee.object
    }

    let contentProp: ViewParserProp | undefined
    if (n.arguments.length > 0) {
      // ---- The last argument is the content prop of the type,
      //      so only parse prop when it exists instead of
      //      treating empty prop as "true" like other props
      contentProp = this.parseProp(n.arguments[0])
    }

    if (t.isIdentifier(n.callee)) {
      // ---- Special cases for expression type
      const tagName = n.callee.name
      if (tagName === this.expressionTagSymbol && contentProp) {
        // ---- Must have content prop or else just ignore it
        this.viewParserResult.push({
          type: "exp",
          content: contentProp,
          props
        })
      } else if (tagName === this.environmentTagSymbol) {
        this.viewParserResult.push({
          type: "env",
          props
        })
      } else if (this.htmlTags.includes(tagName)) {
        this.viewParserResult.push({
          type: "html",
          tag: t.stringLiteral(tagName),
          content: contentProp,
          props
        })
      }
    } else if (t.isExpression(n.callee)) {
      // ---- 1. Custom tag
      //      2. htmlTag(xxx)
      //      3. tag(xxx)
      const [tagType, tag] = this.alterTagType(n.callee)
      this.viewParserResult.push({
        type: tagType,
        tag,
        content: contentProp,
        props
      })
    }
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Test if the node is a pure member expression without call expression
   * @param node
   */
  private isPureMemberExpression(node: any) {
    while (node) {
      node = node.callee?.object
      if (t.isCallExpression(node)) {
        return false
      }
    }
    return true
  }

  /**
   * @brief Alter the tag type
   * @param viewParserUnit
   * @returns
   */
  alterTagType(tag: t.Expression): ["html" | "custom", t.Expression] {
    if (t.isCallExpression(tag) && t.isIdentifier(tag.callee)) {
      const tagName = tag.callee.name
      const tagType = tagName === this.htmlTagSymbol
        ? "html"
        : tagName === this.tagNameSymbol
          ? "custom"
          : undefined
      if (tagType) {
        const tagTarget = tag.arguments[0]
        if (!t.isExpression(tagTarget)) {
          throw new Error(`First argument of ${tagName}() must be an expression`)
        }
        return [tagType, tagTarget]
      }
    }
    return ["custom", tag]
  }
}

let ViewParserClass = ViewParser
export function changeViewParserClass(newClass: typeof ViewParserClass) {
  ViewParserClass = newClass
}

export function parseView(classRootPath: BabelPath, statements: Array<t.Statement | t.Directive>): ViewParserUnit[] {
  return new ViewParserClass(classRootPath, statements).parse()
}
