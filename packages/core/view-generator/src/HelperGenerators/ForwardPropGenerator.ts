import { type types as t } from "@babel/core"
import ElementGenerator from "./ElementGenerator"

export default class ForwardPropGenerator extends ElementGenerator {
  /**
   * this._$forwardProp(${dlNodeName})
   */
  forwardProp(dlNodeName: string): t.ExpressionStatement {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$addForwardProp")
          ),
          [this.t.identifier(dlNodeName)]
        )
      )
    )
  }
}
