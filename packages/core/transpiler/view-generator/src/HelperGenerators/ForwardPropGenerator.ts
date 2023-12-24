import { type types as t } from "@babel/core"
import ElementGenerator from "./ElementGenerator"

export default class ForwardPropsGenerator extends ElementGenerator {
  /**
   * @View
   * this._$forwardProp(${dlNodeName})
   */
  forwardProps(dlNodeName: string): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.thisExpression(),
          this.t.identifier("_$addForwardProps")
        ),
        [this.t.identifier(dlNodeName)]
      )
    )
  }
}
