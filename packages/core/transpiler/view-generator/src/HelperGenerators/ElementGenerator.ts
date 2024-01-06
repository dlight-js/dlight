import { type types as t } from "@babel/core"
import { DLError } from "../error"
import PropViewGenerator from "./PropViewGenerator"

export default class ElementGenerator extends PropViewGenerator {
  /**
   * @View
   * View.addDidMount(${dlNodeName}, () => { ${elementNode} })
   * @param el true: dlNodeName._$el, false: dlNodeName
   */
  initElement(
    dlNodeName: string,
    value: t.Expression,
    el = false
  ): t.Statement {
    const elNode = el
      ? this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("_$el")
        )
      : this.t.identifier(dlNodeName)
    const elementNode = this.isOnlyMemberExpression(value)
      ? this.assignHTMLElement(value as t.MemberExpression)
      : this.assignHTMLFunctionElement(value)

    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier("View"),
          this.t.identifier("addDidMount")
        ),
        [elNode, elementNode]
      )
    )
  }

  /**
   * ${elementNode}(${dlNodeName})
   * @param el true: dlNodeName._$el, false: dlNodeName
   */
  updateElement(
    dlNodeName: string,
    value: t.Expression,
    el = false
  ): t.Statement | null {
    if (!this.isOnlyMemberExpression(value)) return null
    const elNode = el
      ? this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("_$el")
        )
      : this.t.identifier(dlNodeName)

    return this.t.expressionStatement(
      this.t.logicalExpression(
        "&&",
        this.t.identifier(dlNodeName),
        this.t.callExpression(
          this.assignHTMLElement(value as t.MemberExpression),
          [elNode]
        )
      )
    )
  }

  private functionWrapper(statement: t.Statement): t.ArrowFunctionExpression {
    return this.t.arrowFunctionExpression(
      [this.t.identifier("$nodeEl")],
      this.t.blockStatement([statement])
    )
  }
  /**
   * $nodeEl => {
   * if (typeof ${value} === "function") {
   *  ${value}($nodeEl)
   * } else {
   *  ${value} = $nodeEl
   * }
   * }
   */
  private assignHTMLElement(
    value: t.MemberExpression
  ): t.ArrowFunctionExpression {
    const statement = this.t.ifStatement(
      this.t.binaryExpression(
        "===",
        this.t.unaryExpression("typeof", value, true),
        this.t.stringLiteral("function")
      ),
      this.t.expressionStatement(
        this.t.callExpression(value, [this.t.identifier("$nodeEl")])
      ),
      this.t.expressionStatement(
        this.t.assignmentExpression("=", value, this.t.identifier("$nodeEl"))
      )
    )

    return this.functionWrapper(statement)
  }

  /**
   * ${value}
   */
  private assignHTMLFunctionElement(
    value: t.Expression
  ): t.FunctionExpression | t.ArrowFunctionExpression {
    if (
      !this.t.isFunctionExpression(value) &&
      !this.t.isArrowFunctionExpression(value)
    ) {
      return DLError.throw1()
    }

    return value
  }

  // --- Utils
  private isOnlyMemberExpression(value: t.Expression): boolean {
    if (!this.t.isMemberExpression(value)) return false
    while (value.property) {
      if (this.t.isMemberExpression(value.property)) {
        value = value.property
        continue
      } else if (this.t.isIdentifier(value.property)) break
      else return false
    }
    return true
  }
}
