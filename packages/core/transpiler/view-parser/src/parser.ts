import { type types as t, type traverse as tr } from "@babel/core"
import {
  type ViewProp,
  type IfBranch,
  type ViewUnit,
  type ViewParserConfig,
  type ViewParserOption,
  SwitchBranch,
} from "./types"
import { DLError } from "./error"

export class ViewParser {
  private readonly compWrapper: string = "comp"
  private readonly htmlTagWrapper: string = "tag"
  private readonly environmentTagName: string = "env"
  private readonly expressionTagName: string = "_"

  private readonly config: ViewParserConfig
  private readonly options?: ViewParserOption

  private readonly t: typeof t
  private readonly traverse: typeof tr
  private readonly subviewNames: string[]
  private readonly htmlTags: string[]

  readonly viewUnits: ViewUnit[] = []

  /**
   * @brief Constructor
   * @param statement
   * @param config
   * @param options
   */
  constructor(config: ViewParserConfig, options?: ViewParserOption) {
    this.config = config
    this.options = options
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.subviewNames = config.subviewNames
    this.htmlTags = config.htmlTags
    options?.environmentTagName &&
      (this.environmentTagName = options.environmentTagName)
    options?.expressionTagName &&
      (this.expressionTagName = options.expressionTagName)
    options?.htmlTagWrapper && (this.htmlTagWrapper = options.htmlTagWrapper)
    options?.compWrapper && (this.compWrapper = options.compWrapper)
  }

  parse(statement: t.BlockStatement) {
    const statements = [...statement.directives, ...statement.body]
    statements.forEach(this.parseStatement.bind(this))
    // ---- If the view is an empty env, throw an error
    if (
      this.viewUnits.length === 1 &&
      this.viewUnits[0].type === "env" &&
      this.viewUnits[0].children.length === 0
    ) {
      DLError.error2()
      return []
    }

    return this.viewUnits
  }

  /**
   * @brief Parse the statements
   * @returns
   */
  private parseStatement(statement: t.Statement | t.Directive): void {
    if (this.isInvalidExpression(statement)) return
    if (this.t.isExpressionStatement(statement)) {
      this.parseExpression(statement.expression)
      return
    }
    if (this.t.isForOfStatement(statement)) {
      this.parseFor(statement)
      return
    }
    if (this.t.isIfStatement(statement)) {
      this.parseIf(statement)
      return
    }
    if (this.t.isSwitchStatement(statement)) {
      this.parseSwitch(statement)
      return
    }
    if (this.t.isDirective(statement)) {
      this.parseText(statement.value)
      return
    }
    if (this.t.isBlockStatement(statement)) {
      // ---- If the statement is a block statement, treat it as last unit's children
      const lastViewUnit = this.viewUnits[this.viewUnits.length - 1]
      const type = lastViewUnit?.type
      const childViewUnits = this.parseView(statement)
      if (type === "html") {
        delete lastViewUnit.content
        lastViewUnit.children = childViewUnits
      } else if (type === "comp" || type === "subview") {
        lastViewUnit.children = childViewUnits
      } else if (type === "env") {
        if (childViewUnits.length > 0) {
          lastViewUnit.children = childViewUnits
        } else {
          this.viewUnits.pop()
          DLError.error2()
        }
      } else {
        DLError.error3()
      }
    }
  }

  /**
   * @brief Parse the expression node
   *  CallExpression -> Tag
   *  StringLiteral/TemplateLiteral -> Text
   *  TaggedTemplateExpression -> Tag + Text / Exp
   * @param expression
   */
  private parseExpression(expression: t.Expression): void {
    if (this.t.isCallExpression(expression)) {
      this.parseTag(expression)
      return
    }
    if (
      this.t.isStringLiteral(expression) ||
      this.t.isTemplateLiteral(expression)
    ) {
      this.parseText(expression)
      return
    }
    if (this.t.isTaggedTemplateExpression(expression)) {
      this.parseTaggedTemplate(expression)
      return
    }

    // ---- Default ExpressionTag
    //      e.g. this.count -> _(this.count)
    this.viewUnits.push({
      type: "exp",
      content: this.parseProp(expression),
    })
  }

  /**
   * @brief Parse if statement conditions
   * @param node
   * @returns IfBranch[]
   */
  private parseIfBranches(node: t.IfStatement): IfBranch[] {
    const conditions: IfBranch[] = []
    const condition = node.test
    const ifBody = this.t.isBlockStatement(node.consequent)
      ? node.consequent
      : this.t.blockStatement([node.consequent])
    conditions.push({
      condition,
      children: this.parseView(ifBody),
    })

    // ---- If the alternate is an if statement, parse it recursively
    if (this.t.isIfStatement(node.alternate)) {
      conditions.push(...this.parseIfBranches(node.alternate))
    } else if (node.alternate) {
      const altBody = this.t.isBlockStatement(node.alternate)
        ? node.alternate
        : this.t.blockStatement([node.alternate])
      conditions.push({
        condition: this.t.booleanLiteral(true),
        children: this.parseView(altBody),
      })
    }

    return conditions
  }

  /**
   * @brief Parse if statement with else if and else
   * @param node
   */
  private parseIf(node: t.IfStatement): void {
    this.viewUnits.push({
      type: "if",
      branches: this.parseIfBranches(node),
    })
  }

  /**
   * @brief Parse switch statement
   * @param node
   */
  private parseSwitch(node: t.SwitchStatement) {
    const branches: SwitchBranch[] = []
    const switchBody = node.cases
    switchBody.forEach(s => {
      const caseBodyPre = s.consequent
      const caseBody =
        caseBodyPre.length === 1 && this.t.isBlockStatement(caseBodyPre[0])
          ? caseBodyPre[0]
          : this.t.blockStatement(caseBodyPre)
      const isBreak = this.t.isBreakStatement(
        caseBody.body[caseBody.body.length - 1]
      )
      if (isBreak) {
        caseBody.body.pop()
      }

      const children = this.parseView(caseBody)
      const branch: SwitchBranch = {
        case: s.test,
        children,
        break: isBreak,
      }
      branches.push(branch)
    })
    this.viewUnits.push({
      type: "switch",
      discriminant: node.discriminant,
      branches,
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
      DLError.throw1()
    }
    const item = (left as t.VariableDeclaration).declarations[0].id
    const array = node.right
    let key: t.Expression | undefined
    const forBody = node.body
    let forBodyStatements: Array<t.Statement | t.Directive>
    if (this.t.isExpressionStatement(forBody)) {
      // ---- If the for body is an expression statement, treat it as the only statement
      forBodyStatements = [forBody]
    } else if (this.t.isBlockStatement(forBody)) {
      const childNodes = forBody.body
      if (childNodes.length === 0) return DLError.error5()
      const firstStatement = childNodes[0]
      if (
        this.t.isLabeledStatement(firstStatement) &&
        this.t.isIdentifier(firstStatement.label)
      ) {
        if (
          firstStatement.label.name !== "key" ||
          !this.t.isExpressionStatement(firstStatement.body)
        ) {
          DLError.error4()
        } else {
          // ---- Treat the first array element labeled by key as the key
          const keyNode = firstStatement.body.expression
          // ---- If the key is undefined or null, treat it as no key
          if (
            this.t.isExpression(keyNode) &&
            !(
              this.t.isNullLiteral(keyNode) ||
              (this.t.isIdentifier(keyNode) && keyNode.name === "undefined")
            )
          ) {
            key = keyNode
          }
        }
        forBodyStatements = childNodes.slice(1)
      } else {
        forBodyStatements = childNodes
      }
    } else return

    const directives = forBodyStatements.filter(s =>
      this.t.isDirective(s)
    ) as t.Directive[]
    const statements = forBodyStatements.filter(
      s => !this.t.isDirective(s)
    ) as t.Statement[]
    const forBodyBlockStatement = this.t.blockStatement(statements, directives)
    // ---- Parse the for body statements
    this.viewUnits.push({
      type: "for",
      item,
      array,
      key,
      children: this.parseView(forBodyBlockStatement),
    })
  }

  /**
   * @brief Parse text node
   *  1. `text text`
   *  2. "text2 text2"
   * @param node
   */
  private parseText(
    node: t.StringLiteral | t.TemplateLiteral | t.DirectiveLiteral
  ): void {
    if (this.t.isDirectiveLiteral(node)) node = this.t.stringLiteral(node.value)

    this.viewUnits.push({
      type: "text",
      content: node,
    })
  }

  /**
   * @brief Parse tagged template expression
   * Two tagged template expression cases
   *  1. type without call expressions
   *      e.g. i18n`any text`
   *        => exp: _(i18n`any text`)
   *  2. type with string literal / template literal
   *      e.g. "any text" `any other text`/ `any text` `any other text`
   *       => text: "any text" + text: `any other text`
   * @param node
   * @param path
   */
  private parseTaggedTemplate(node: t.TaggedTemplateExpression): void {
    if (
      this.t.isStringLiteral(node.tag) ||
      this.t.isTemplateLiteral(node.tag)
    ) {
      // ---- Case 2
      this.viewUnits.push({
        type: "text",
        content: node.tag,
      })
      this.viewUnits.push({
        type: "text",
        content: node.quasi,
      })
      return
    }
    // ---- Case 1
    this.viewUnits.push({
      type: "exp",
      content: this.parseProp(node),
    })
  }

  /**
   * @brief Parse props in the type node
   * @param propNode
   * @returns ViewProp
   */
  private parseProp(propNode: t.Node | undefined): ViewProp {
    if (propNode && !this.t.isExpression(propNode)) DLError.throw3()
    propNode = propNode as t.Expression
    // ---- If there is no propNode, set the default prop as true
    if (!propNode) {
      return {
        value: this.t.booleanLiteral(true),
        viewPropMap: {},
      }
    }

    // ---- Collect View => {} nodes as DLProp
    const dlViewPropResult: Record<string, ViewUnit[]> = {}
    this.traverse(this.valueWrapper(propNode), {
      ArrowFunctionExpression: innerPath => {
        const node = innerPath.node
        if (node.params.length === 0) return
        const firstParam = node.params[0]
        if (
          !this.t.isIdentifier(firstParam, { name: "View" }) &&
          !this.t.isIdentifier(firstParam, { name: "_View" })
        )
          return
        const body = this.t.isBlockStatement(node.body)
          ? node.body
          : this.t.blockStatement([this.t.expressionStatement(node.body)])
        const id = this.uid()
        // ---- Parse the body of View => {} as a new View
        dlViewPropResult[id] = this.parseView(body)
        // ---- Replace the View => {} with a id string literal
        const newNode = this.t.stringLiteral(id)
        if (node === propNode) {
          propNode = newNode
        }
        innerPath.replaceWith(newNode)
        innerPath.skip()
      },
    })

    return {
      value: propNode,
      viewPropMap: dlViewPropResult,
    }
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
        DLError.throw1()
        continue
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
      if (tagName === this.expressionTagName && contentProp) {
        // ---- Must have content prop or else just ignore it
        this.viewUnits.push({
          type: "exp",
          content: contentProp,
          props,
        })
        return
      }
      if (tagName === this.environmentTagName) {
        if (Object.keys(props).length === 0) {
          DLError.warn1()
          return
        }
        this.viewUnits.push({
          type: "env",
          props,
          children: [],
        })
        return
      }
      if (this.htmlTags.includes(tagName)) {
        this.viewUnits.push({
          type: "html",
          tag: this.t.stringLiteral(tagName),
          content: contentProp,
          props,
        })
        return
      }
      // ---- Custom tag
      this.viewUnits.push({
        type: "comp",
        tag: n.callee,
        content: contentProp,
        props,
      })
      return
    }
    if (
      this.t.isMemberExpression(n.callee) &&
      this.t.isThisExpression(n.callee.object) &&
      this.t.isIdentifier(n.callee.property) &&
      this.subviewNames.includes(n.callee.property.name)
    ) {
      // ---- Subview
      if (contentProp) props.content = contentProp
      if (
        !(
          this.t.isMemberExpression(n.callee) &&
          this.t.isThisExpression(n.callee.object) &&
          this.t.isIdentifier(n.callee.property)
        )
      )
        return DLError.throw4()
      this.viewUnits.push({
        type: "subview",
        tag: n.callee.property.name,
        props,
      })
      return
    }
    if (this.t.isExpression(n.callee)) {
      // ---- 1. Custom tag
      //      2. htmlTag(xxx)
      //      3. tag(xxx)
      const [tagType, tag] = this.alterTagType(n.callee)
      this.viewUnits.push({
        type: tagType,
        tag,
        content: contentProp,
        props,
      })
    }
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Test if the node is a pure member expression without call expression
   * @param node
   */
  private isPureMemberExpression(node: t.Expression): boolean {
    let isPure = true
    this.traverse(this.valueWrapper(node), {
      CallExpression: () => {
        isPure = false
      },
    })
    return isPure
  }

  /**
   * @brief Alter the tag type by checking the tag name
   * @param viewUnit
   * @returns ["html" | "comp", t.Expression]
   */
  private alterTagType(tag: t.Expression): ["html" | "comp", t.Expression] {
    if (this.t.isCallExpression(tag) && this.t.isIdentifier(tag.callee)) {
      const tagName = tag.callee.name
      const tagType =
        tagName === this.htmlTagWrapper
          ? "html"
          : tagName === this.compWrapper
            ? "comp"
            : undefined
      if (tagType) {
        const tagTarget = tag.arguments[0]
        if (!this.t.isExpression(tagTarget)) DLError.throw2(tagName)
        return [tagType, tagTarget as t.Expression]
      }
    }
    return ["comp", tag]
  }

  /**
   * @brief Test if the expression is invalid
   *  1. For: only accept ForOfStatement
   * @param node
   * @returns is this expression invalid
   */
  private isInvalidExpression(node: t.Statement | t.Directive): boolean {
    const isInvalidForStatement =
      this.t.isForStatement(node) && !this.t.isForOfStatement(node)
    if (isInvalidForStatement) {
      DLError.error1()
      return true
    }
    return false
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression): t.File {
    return this.t.file(this.t.program([this.t.expressionStatement(node)]))
  }

  /**
   * @brief Parse the view by duplicating current parser's classRootPath, statements and htmlTags
   * @param statements
   * @returns ViewUnit[]
   */
  private parseView(statement: t.BlockStatement): ViewUnit[] {
    return new ViewParser(this.config, this.options).parse(statement)
  }

  /**
   * @brief Generate a unique id
   * @returns a unique id
   */
  private uid(): string {
    return Math.random().toString(36).slice(2)
  }
}
