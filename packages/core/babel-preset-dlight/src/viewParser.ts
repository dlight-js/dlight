import { type types as t, type NodePath } from "@babel/core"
import { type ViewProp, type IfCondition, type ViewHTMLProp, type ViewUnit } from "./types"
import { uid } from "./utils/utils"

export class ViewParser {
  private readonly tagNameSymbol = "tag"
  private readonly htmlTagSymbol = "htmlTag"
  private readonly environmentTagSymbol = "env"
  private readonly expressionTagSymbol = "_"

  private readonly t: typeof t
  private readonly classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>
  private readonly statements: Array<t.Statement | t.Directive>
  private readonly subviewNames: string[]
  private readonly htmlTags: string[]

  private readonly viewResult: ViewUnit[] = []

  /**
   * @param types types from Babel
   * @param classRootPath the root path of the class to be parsed
   * @param statements view statements to be parsed
   * @param htmlTags allowed html tags
   */
  constructor(
    types: typeof t,
    classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
    statements: Array<t.Statement | t.Directive>,
    subviewNames: string[],
    htmlTags: string[]
  ) {
    this.t = types
    this.classRootPath = classRootPath
    this.statements = statements
    this.subviewNames = subviewNames
    this.htmlTags = htmlTags
  }

  /**
   * @brief Parse the statements
   * @returns
   */
  parse(): ViewUnit[] {
    this.statements.forEach(this.parseStatement.bind(this))
    return this.viewResult
  }

  /**
   * @brief Parse the statements
   * @returns
   */
  private parseStatement(statement: t.Statement | t.Directive): void {
    if (this.t.isExpressionStatement(statement)) return this.parseExpression(statement.expression)
    if (this.t.isForOfStatement(statement)) return this.parseFor(statement)
    if (this.t.isIfStatement(statement)) return this.parseIf(statement)
    if (this.t.isDirective(statement)) return this.parseText(statement.value)
    if (this.t.isBlockStatement(statement)) {
      // ---- If the statement is a block statement, treat it as last unit's children
      const lastViewUnit = this.viewResult[this.viewResult.length - 1]
      const type = lastViewUnit?.type
      if (!(type === "custom" || type === "html" || type === "env")) return
      lastViewUnit.children = this.parseView(statement.body)
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
    if (this.t.isCallExpression(expression)) return this.parseTag(expression)
    if (this.t.isStringLiteral(expression) || this.t.isTemplateLiteral(expression)) return this.parseText(expression)
    if (this.t.isTaggedTemplateExpression(expression)) return this.parseTaggedTemplate(expression)

    // ---- Default ExpressionTag
    //      e.g. this.count -> _(this.count)
    this.viewResult.push({
      type: "exp",
      content: this.parseProp(expression)
    })
  }

  /**
   * @brief Parse if statement conditions
   * @param node
   * @returns
   */
  private parseIfConditions(node: t.IfStatement): IfCondition[] {
    const conditions: IfCondition[] = []
    const condition = node.test
    const ifBody = this.t.isBlockStatement(node.consequent) ? node.consequent.body : [node.consequent]
    conditions.push({
      condition,
      body: this.parseView(ifBody)
    })

    // ---- If the alternate is an if statement, parse it recursively
    if (this.t.isIfStatement(node.alternate)) {
      conditions.push(...this.parseIfConditions(node.alternate))
    } else if (node.alternate) {
      const altBody = this.t.isBlockStatement(node.alternate) ? node.alternate.body : [node.alternate]
      conditions.push({
        condition: this.t.booleanLiteral(true),
        body: this.parseView(altBody)
      })
    }

    return conditions
  }

  /**
   * @brief Parse if statement with else if and else
   * @param node
   * @returns
   */
  private parseIf(node: t.IfStatement): void {
    this.viewResult.push({
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
  private parseFor(node: t.ForOfStatement): void {
    const left = node.left
    if (!this.t.isVariableDeclaration(left)) {
      throw new Error(
        "Invalid syntax in DLight's View, only accepts variable declaration in for of loop"
      )
    }
    const item = left.declarations[0].id
    const array = node.right
    let key: t.Expression | undefined
    const forBody = node.body
    let forBodyStatements: Array<t.Statement | t.Directive>
    if (this.t.isExpressionStatement(forBody)) {
      // ---- If the for body is an expression statement, treat it as the only statement
      forBodyStatements = [forBody]
    } else if (this.t.isBlockStatement(forBody)) {
      const childNodes = forBody.body
      if (childNodes.length === 0) return
      const firstStatement = childNodes[0]
      if (
        this.t.isExpressionStatement(firstStatement) &&
        this.t.isArrayExpression(firstStatement.expression)
      ) {
        // ---- Treat the first array element inside the block statement as the key
        const keyNode = firstStatement.expression.elements[0]
        // ---- If the key is undefined or null, treat it as no key
        if (
          this.t.isExpression(keyNode) &&
          !(this.t.isNullLiteral(keyNode) ||
          (this.t.isIdentifier(keyNode) && keyNode.name === "undefined"))
        ) {
          key = keyNode
        }
        forBodyStatements = childNodes.slice(1)
      } else {
        forBodyStatements = childNodes
      }
    } else return

    // ---- Parse the for body statements
    this.viewResult.push({
      type: "for",
      item,
      array,
      key,
      children: this.parseView(forBodyStatements)
    })
  }

  /**
   * @brief Parse text node
   *  1. `text text`
   *  2. "text2 text2"
   * @param node
   */
  private parseText(node: t.StringLiteral | t.TemplateLiteral | t.DirectiveLiteral): void {
    if (this.t.isDirectiveLiteral(node)) node = this.t.stringLiteral(node.value)

    if (this.isStaticProp(node)) {
      this.viewResult.push({
        type: "text",
        content: node.value
      })
      return
    }
    this.viewResult.push({
      type: "text",
      content: node,
      computed: true
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
      this.viewResult.push({
        type: "exp",
        content: this.parseProp(node)
      })
      return
    }

    // ---- Case 2
    this.parseExpression(node.tag)
    this.viewResult.push({
      type: "text",
      content: node.quasi,
      computed: true
    })
  }

  /**
   * @brief Parse props in the type node
   * @param propNode
   * @returns ViewProp
   */
  private parseProp(propNode: t.Node | undefined): ViewProp {
    if (!this.t.isExpression(propNode)) {
      throw new Error(
        "Invalid syntax in DLight's View, only accepts expression as props"
      )
    }
    // ---- If there is no propNode, set the default prop as true
    if (!propNode) {
      return {
        value: this.t.booleanLiteral(true),
        nodes: {}
      }
    }

    // ---- Collect do expression nodes as DLProp
    const dlViewPropResult: Record<string, ViewUnit[]> = {}
    this.classRootPath.scope.traverse(this.valueWrapper(propNode), {
      DoExpression: innerPath => {
        const node = innerPath.node
        const id = uid()
        // ---- Parse the body of do expression as a new View
        dlViewPropResult[id] = this.parseView(node.body.body)
        // ---- Replace the do expression with a id string literal
        const newNode = this.t.stringLiteral(id)
        if (node === propNode) {
          propNode = newNode
        }
        innerPath.replaceWith(newNode)
        innerPath.skip()
      }
    })

    return {
      value: propNode,
      nodes: dlViewPropResult
    }
  }

  private toHTMLProps(prop: Record<string, ViewProp>): Record<string, ViewHTMLProp> {
    const toHTMLProp = (prop: ViewProp): ViewHTMLProp => {
      if (this.isStaticProp(prop.value)) {
        return {
          value: prop.value.value
        }
      }
      return {
        computed: true,
        value: prop.value,
        nodes: prop.nodes
      }
    }
    return Object.fromEntries(Object.entries(prop).map(([key, prop]) => [key, toHTMLProp(prop)]))
  }

  /**
   * @brief Parse the type node
   * @param node
   */
  private parseTag(node: t.CallExpression): void {
    const props: Record<string, ViewProp> = {}

    // ---- Keep iterating until the node has no call expression
    let n = node
    while (
      this.t.isMemberExpression(n?.callee) &&
      n?.callee?.object &&
      !this.isPureMemberExpression(n.callee)
    ) {
      const property = n.callee.property
      if (
        !this.t.isIdentifier(property) ||
        !this.t.isCallExpression(n.callee.object)
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

    let contentProp: ViewProp | undefined
    if (n.arguments.length > 0) {
      // ---- The last argument is the content prop of the type,
      //      so only parse prop when it exists instead of
      //      treating empty prop as "true" like other props
      contentProp = this.parseProp(n.arguments[0])
    }

    if (this.t.isIdentifier(n.callee)) {
      // ---- Special cases for expression type
      const tagName = n.callee.name
      if (tagName === this.expressionTagSymbol && contentProp) {
        // ---- Must have content prop or else just ignore it
        this.viewResult.push({
          type: "exp",
          content: contentProp,
          props
        })
      } else if (tagName === this.environmentTagSymbol) {
        this.viewResult.push({
          type: "env",
          props
        })
      } else if (this.htmlTags.includes(tagName)) {
        if (contentProp) props.textContent = contentProp
        this.viewResult.push({
          type: "html",
          tag: tagName,
          props: this.toHTMLProps(props)
        })
      } else if (this.subviewNames) {
        // ---- Custom tag
        this.viewResult.push({
          type: "custom",
          tag: this.t.identifier(tagName),
          content: contentProp,
          props
        })
      }
    } else if (
      this.t.isMemberExpression(n.callee) &&
      this.t.isThisExpression(n.callee.object) &&
      this.t.isIdentifier(n.callee.property) &&
      this.subviewNames.includes(n.callee.property.name)
    ) {
      // ---- Subview
      this.viewResult.push({
        type: "subview",
        tag: n.callee.property.name,
        props
      })
    } else if (this.t.isExpression(n.callee)) {
      // ---- 1. Custom tag
      //      2. htmlTag(xxx)
      //      3. tag(xxx)
      const [tagType, tag] = this.alterTagType(n.callee)
      if (tagType === "html") {
        if (contentProp) props.textContent = contentProp
        this.viewResult.push({
          type: "html",
          tag,
          props: this.toHTMLProps(props),
          computed: true
        }
        )
      } else {
        this.viewResult.push({
          type: tagType,
          tag,
          content: contentProp,
          props
        })
      }
    }
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Test if the node is a pure member expression without call expression
   * @param node
   */
  private isPureMemberExpression(node: t.Expression) {
    let isPure = true
    this.classRootPath.scope.traverse(node, {
      CallExpression: () => {
        isPure = false
      }
    })
    return isPure
  }

  /**
   * @brief Alter the tag type
   * @param viewUnit
   * @returns
   */
  private alterTagType(tag: t.Expression): ["html" | "custom", t.Expression] {
    if (this.t.isCallExpression(tag) && this.t.isIdentifier(tag.callee)) {
      const tagName = tag.callee.name
      const tagType = tagName === this.htmlTagSymbol
        ? "html"
        : tagName === this.tagNameSymbol
          ? "custom"
          : undefined
      if (tagType) {
        const tagTarget = tag.arguments[0]
        if (!this.t.isExpression(tagTarget)) {
          throw new Error(`First argument of ${tagName}() must be an expression`)
        }
        return [tagType, tagTarget]
      }
    }
    return ["custom", tag]
  }

  /**
   * @brief Wrap the value with a variable declaration
   * const _ = ${value}
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression): t.VariableDeclaration {
    return this.t.variableDeclaration("const", [this.t.variableDeclarator(this.t.identifier("_"), node)])
  }

  /**
   * @brief Parse the view by duplicating current parser's classRootPath, statements and htmlTags
   * @param statements
   * @returns ViewUnit[]
   */
  private parseView(statements: Array<t.Statement | t.Directive>): ViewUnit[] {
    return parseView(this.t, this.classRootPath, statements, this.subviewNames, this.htmlTags)
  }

  private isStaticProp(propNode: t.Node): propNode is t.StringLiteral | t.NumericLiteral | t.BooleanLiteral {
    return (
      this.t.isStringLiteral(propNode) ||
      this.t.isNumericLiteral(propNode) ||
      this.t.isBooleanLiteral(propNode)
    )
  }
}

/**
 * @brief Change the View class with its subclass
 * @param newClass
 */
let ViewParserClass = ViewParser
export function changeViewParserClass(newClass: typeof ViewParserClass): void {
  ViewParserClass = newClass
}

/**
 * @brief Parse the view
 * @param types
 * @param classRootPath
 * @param statements
 * @param htmlTags
 * @returns ViewUnit[]
 */
export function parseView(
  types: typeof t,
  classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
  statements: Array<t.Statement | t.Directive>,
  subviewNames: string[],
  htmlTags: string[]
): ViewUnit[] {
  return new ViewParserClass(types, classRootPath, statements, subviewNames, htmlTags).parse()
}
