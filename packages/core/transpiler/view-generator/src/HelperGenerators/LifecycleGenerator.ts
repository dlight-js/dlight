import { type types as t } from "@babel/core"
import BaseGenerator from "./BaseGenerator"

export default class LifecycleGenerator extends BaseGenerator {
  static lifecycle = [
    "willMount",
    "didMount",
    "willUnmount",
    "didUnmount",
  ] as const

  /**
   * @View
   * ${dlNodeName} && ${value}(${dlNodeName}, changed)
   */
  addOnUpdate(dlNodeName: string, value: t.Expression): t.Statement {
    return this.t.expressionStatement(
      this.t.logicalExpression(
        "&&",
        this.t.identifier(dlNodeName),
        this.t.callExpression(value, [
          this.t.identifier(dlNodeName),
          ...this.updateParams.slice(1),
        ])
      )
    )
  }

  /**
   * @View
   * willMount:
   *  - ${value}(${dlNodeName})
   * didMount/willUnmount/didUnmount:
   *  - View.addDidMount(${dlNodeName}, ${value})
   */
  addLifecycle(
    dlNodeName: string,
    key: (typeof LifecycleGenerator.lifecycle)[number],
    value: t.Expression
  ): t.Statement {
    if (key === "willMount") {
      return this.addWillMount(dlNodeName, value)
    }
    return this.addOtherLifecycle(dlNodeName, value, key)
  }

  /**
   * @View
   * ${value}(${dlNodeName})
   */
  addWillMount(dlNodeName: string, value: t.Expression): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(value, [this.t.identifier(dlNodeName)])
    )
  }

  /**
   * @View
   * View.addDidMount(${dlNodeName}, ${value})
   */
  addOtherLifecycle(
    dlNodeName: string,
    value: t.Expression,
    type: "didMount" | "willUnmount" | "didUnmount"
  ): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier("View"),
          this.t.identifier(`add${type[0].toUpperCase()}${type.slice(1)}`)
        ),
        [this.t.identifier(dlNodeName), value]
      )
    )
  }
}
