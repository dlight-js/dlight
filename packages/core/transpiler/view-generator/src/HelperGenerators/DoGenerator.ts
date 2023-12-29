import { type types as t } from "@babel/core"
import { DLError } from "../error"
import PropViewGenerator from "./PropViewGenerator"

export default class DoGenerator extends PropViewGenerator {
  /**
   * @View
   * ${dlNodeName} && ${value}(${dlNodeName})
   */
  addDo(dlNodeName: string, value: t.Expression): t.ExpressionStatement {
    if (
      !this.t.isFunctionExpression(value) &&
      !this.t.isArrowFunctionExpression(value)
    ) {
      return DLError.throw1()
    }
    return this.t.expressionStatement(
      this.t.logicalExpression(
        "&&",
        this.t.identifier(dlNodeName),
        this.t.callExpression(value, [this.t.identifier(dlNodeName)])
      )
    )
  }
}
