import { type types as t } from "@babel/core"
import { DLError } from "../error"
import DoGenerator from "./DoGenerator"

export default class ElementGenerator extends DoGenerator {
  setElement(dlNodeName: string, value: t.Expression, el = false) {
    const elNode = el
      ? this.t.memberExpression(
        this.t.identifier(dlNodeName),
        this.t.identifier("_$el")
      )
      : this.t.identifier(dlNodeName)

    return this.isOnlyMemberExpression(value)
      ? this.assignHTMLElement(elNode, value as t.MemberExpression)
      : this.assignHTMLFunctionElement(elNode, value)
  }

  /**
   * if (typeof ${value} === "function") {
   *  ${value}(${elNode})
   * } else {
   *  ${value} = ${elNode}
   * }
   */
  private assignHTMLElement(elNode: t.Expression, value: t.MemberExpression) {
    return (
      this.t.ifStatement(
        this.t.binaryExpression(
          "===",
          this.t.unaryExpression(
            "typeof",
            value,
            true
          ),
          this.t.stringLiteral("function")
        ),
        this.t.expressionStatement(
          this.t.callExpression(
            value,
            [elNode]
          )
        ),
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            value,
            elNode
          )
        )
      )
    )
  }

  /**
   * ${value}(${elNode})
   */
  private assignHTMLFunctionElement(elNode: t.Expression, value: t.Expression) {
    if (!this.t.isFunctionExpression(value) && !this.t.isArrowFunctionExpression(value)) {
      return DLError.throw1()
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          value, [
            elNode
          ]
        )
      )
    )
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
