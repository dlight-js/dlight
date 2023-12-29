import { type types as t } from "@babel/core"
import { type TextParticle } from "@dlightjs/reactivity-parser"
import BaseGenerator from "../HelperGenerators/BaseGenerator"

export default class TextGenerator extends BaseGenerator {
  run() {
    const { content } = this.viewParticle as TextParticle

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(this.declareTextNode(dlNodeName, content.value))

    if (content.dependencyIndexArr && content.dependencyIndexArr.length > 0) {
      this.addUpdateStatements(
        content.dependencyIndexArr,
        this.updateTextNode(dlNodeName, content.value)
      )
    }

    return dlNodeName
  }

  /**
   * @View
   * ${dlNodeName} = createTextNode(${value})
   */
  private declareTextNode(
    dlNodeName: string,
    value: t.Expression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.callExpression(
          this.t.identifier(this.importMap.createTextNode),
          [value]
        )
      )
    )
  }

  /**
   * @View
   * ${dlNodeName} && updateText(${dlNodeName}, ${value})
   */
  private updateTextNode(dlNodeName: string, value: t.Expression): t.Statement {
    return this.t.expressionStatement(
      this.t.logicalExpression(
        "&&",
        this.t.identifier(dlNodeName),
        this.t.callExpression(this.t.identifier(this.importMap.updateText), [
          this.t.identifier(dlNodeName),
          value,
        ])
      )
    )
  }
}
