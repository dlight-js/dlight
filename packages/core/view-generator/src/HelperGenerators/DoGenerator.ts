import { type types as t } from "@babel/core"
import BaseGenerator from "./BaseGenerator"
import { DLError } from "../error"

export default class DoGenerator extends BaseGenerator {
  /**
   * ${value}(dlNodeName)
   */
  addDo(dlNodeName: string, value: t.Expression) {
    if (!this.t.isFunctionExpression(value) && !this.t.isArrowFunctionExpression(value)) {
      return DLError.throw1()
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          value,
          [this.t.identifier(dlNodeName)]
        )
      )
    )
  }
}
