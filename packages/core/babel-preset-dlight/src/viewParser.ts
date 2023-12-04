import * as t from "@babel/types"
import { type BabelPath } from "./types"

export interface ViewParserUnit {
  tag: t.Node | string
  attr: Record<string, any>
  children: ViewParserUnit[]
}

interface ViewParserProp {
  value: t.Node
  nodes: Record<string, ViewParserUnit[]>
}

export class ViewParser {
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
      tag: "_$exp",
      attr: {
        props: { _$content: this.parseProp(expression) }
      },
      children: []
    })
  }

  /**
   * @brief Parse if statement conditions
   * @param node
   * @returns
   */
  parseIfConditions(node: t.IfStatement): Array<{ condition: t.Node, viewParserResult: ViewParserUnit[] }> {
    const conditions: Array<{ condition: t.Node, viewParserResult: ViewParserUnit[] }> = []
    const condition = node.test
    const ifBody = t.isBlockStatement(node.consequent) ? node.consequent.body : [node.consequent]
    conditions.push({
      condition,
      viewParserResult: parseView(this.classRootPath, ifBody)
    })

    // ---- If the alternate is an if statement, parse it recursively
    if (t.isIfStatement(node.alternate)) {
      conditions.push(...this.parseIfConditions(node.alternate))
    } else if (node.alternate) {
      const altBody = t.isBlockStatement(node.alternate) ? node.alternate.body : [node.alternate]
      conditions.push({
        condition: t.booleanLiteral(true),
        viewParserResult: parseView(this.classRootPath, altBody)
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
      tag: "_$if",
      attr: { conditions: this.parseIfConditions(node) },
      children: []
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
    const viewParserUnit: ViewParserUnit = {
      tag: "_$for",
      attr: { item, array },
      children: []
    }
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
        const key = firstStatement.expression.elements[0]
        // ---- If the key is undefined or null, treat it as no key
        if (
          !(t.isNullLiteral(key) ||
          (t.isIdentifier(key) && key.name === "undefined"))
        ) {
          viewParserUnit.attr.key = key
        }
        forBodyStatements = childNodes.slice(1)
      } else {
        // ---- If there's no specified key, use the item as the key
        const itemKey = JSON.parse(JSON.stringify(item))
        // ---- Object and Array in declaration and expression have different types
        //      declaration: ObjectPattern | ArrayPattern
        //      expression: ObjectExpression | ArrayExpression
        this.classRootPath.scope.traverse(this.valueWrapper(itemKey), {
          ObjectPattern: (innerPath: any) => {
            innerPath.node.type = "ObjectExpression"
          },
          ArrayPattern: (innerPath: any) => {
            innerPath.node.type = "ArrayExpression"
          }
        })
        viewParserUnit.attr.key = itemKey
        forBodyStatements = childNodes
      }
    } else return

    // ---- Parse the for body statements
    viewParserUnit.children = parseView(this.classRootPath, forBodyStatements)
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
      tag: "_$text",
      attr: { _$content: node },
      children: []
    })
  }

  /**
   * @brief Parse tagged template expression
   * Two tagged template expression cases
   *  1. tag without call expressions
   *      e.g. i18n`any text`
   *        => exp: _(i18n`any text`)
   *  2. tag with call expressions
   *      e.g. div()`any text`
   *        => tag: div() + text: `any text`
   * @param node
   * @param path
   */
  private parseTaggedTemplate(node: t.TaggedTemplateExpression): void {
    if (this.isPureMemberExpression(node.tag)) {
      // ---- Case 1
      this.viewParserResult.push({
        tag: "_$exp",
        attr: {
          props: { _$content: this.parseProp(node) }
        },
        children: []
      })
      return
    }

    // ---- Case 2
    this.parseExpression(node.tag)
    this.viewParserResult.push({
      tag: "_$text",
      attr: { _$content: node.quasi },
      children: []
    })
  }

  /**
   * @brief Parse props in the tag node
   * @param propNode
   * @returns ViewParserProp
   */
  private parseProp(propNode: t.Node | undefined): ViewParserProp {
    // ---- If there is no propNode, set the default prop as true
    if (!propNode) return { value: t.booleanLiteral(true), nodes: {} }

    // ---- Collect do expression nodes as DLProp
    const dlViewPropResult: Record<string, ViewParserUnit[]> = {}
    this.classRootPath.scope.traverse(
      this.valueWrapper(propNode), {
        DoExpression: (innerPath: BabelPath) => {
          const node = innerPath.node
          const id = this.randomId()
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
   * @brief Parse the tag node
   * @param node
   */
  private parseTag(node: t.CallExpression): void {
    const props: Record<string, any> = {}
    const viewParserUnit: ViewParserUnit = {
      tag: "",
      attr: { props },
      children: []
    }

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

    if (n.arguments.length > 0) {
      // ---- The last argument is the content prop of the tag,
      //      so only parse prop when it exists instead of
      //      treating empty prop as "true" like other props
      const prop = this.parseProp(n.arguments[0])
      props._$content = prop
    }

    if (
      t.isIdentifier(n.callee) &&
      n.callee.name === this.expressionTagSymbol
    ) {
      // ---- Special case for expression tag
      viewParserUnit.tag = "_$exp"
    } else {
      // ---- The last callee is the tag
      viewParserUnit.tag = n.callee
    }

    this.viewParserResult.push(viewParserUnit)
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
   * @brief Wrap the value with a variable declaration
   * const _ = ${value}
   * @param value
   * @returns wrapped value
   */
  private valueWrapper(value: t.Node): t.VariableDeclaration {
    return t.variableDeclaration("const", [t.variableDeclarator(t.identifier("_"), value as any)])
  }

  /**
   * @brief Generate a unique id
   * @returns unique id
   */
  private randomId(): string {
    return Math.random().toString(32).slice(2)
  }
}

let ViewParserClass = ViewParser
export function changeViewParserClass(newClass: typeof ViewParserClass) {
  ViewParserClass = newClass
}

export function parseView(classRootPath: BabelPath, statements: Array<t.Statement | t.Directive>): ViewParserUnit[] {
  return new ViewParserClass(classRootPath, statements).parse()
}
