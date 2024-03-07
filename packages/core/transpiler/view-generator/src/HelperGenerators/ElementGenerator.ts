import { type types as t } from "@babel/core"
import PropViewGenerator from "./PropViewGenerator"

export default class ElementGenerator extends PropViewGenerator {
  /**
   * @View
   * el:
   * View.addDidMount(${dlNodeName}, () => (
   *   typeof ${value} === "function" ? ${value}($nodeEl) : ${value} = $nodeEl
   * ))
   * not el:
   * typeof ${value} === "function" ? ${value}($nodeEl) : ${value} = $nodeEl
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
    let elementNode
    if (this.isOnlyMemberExpression(value)) {
      elementNode = this.t.conditionalExpression(
        this.t.binaryExpression(
          "===",
          this.t.unaryExpression("typeof", value, true),
          this.t.stringLiteral("function")
        ),
        this.t.callExpression(value, [elNode]),
        this.t.assignmentExpression("=", value as t.LVal, elNode)
      )
    } else {
      elementNode = this.t.callExpression(value, [elNode])
    }

    return el
      ? this.t.expressionStatement(
          this.t.callExpression(
            this.t.memberExpression(
              this.t.identifier("View"),
              this.t.identifier("addDidMount")
            ),
            [
              this.t.identifier(dlNodeName),
              this.t.arrowFunctionExpression([], elementNode),
            ]
          )
        )
      : this.t.expressionStatement(elementNode)
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
