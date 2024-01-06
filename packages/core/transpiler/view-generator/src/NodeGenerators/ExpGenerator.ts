import { type types as t } from "@babel/core"
import { type ExpParticle } from "@dlightjs/reactivity-parser"
import ElementGenerator from "../HelperGenerators/ElementGenerator"
import { DLError } from "../error"

export default class ExpGenerator extends ElementGenerator {
  run() {
    let { content, props } = this.viewParticle as ExpParticle
    content = this.alterPropView(content)!
    props = this.alterPropViews(props)

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(this.declareExpNode(dlNodeName, content.value))

    if (content.dependencyIndexArr && content.dependencyIndexArr.length > 0) {
      this.addUpdateStatements(
        content.dependencyIndexArr,
        this.updateExpNode(dlNodeName)
      )
    }

    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (
          ExpGenerator.lifecycle.includes(
            key as (typeof ExpGenerator.lifecycle)[number]
          )
        ) {
          return this.addInitStatement(
            this.addLifecycle(
              dlNodeName,
              key as (typeof ExpGenerator.lifecycle)[number],
              value
            )
          )
        }
        if (key === "element") {
          this.addInitStatement(this.initElement(dlNodeName, value, true))
          const updateStatement = this.updateElement(dlNodeName, value, true)
          if (updateStatement)
            this.addUpdateStatements(dependencyIndexArr, updateStatement)
          return
        }
        if (key === "didUpdate") {
          this.addUpdateStatements(
            content.dependencyIndexArr,
            this.addOnUpdate(dlNodeName, value)
          )
          return
        }
        DLError.warn1(key)
      })
    }

    return dlNodeName
  }

  /**
   * @View
   * ${dlNodeName} = new ExpNode(() => ${value})
   */
  private declareExpNode(dlNodeName: string, value: t.Expression): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.ExpNode), [
          this.t.arrowFunctionExpression([], value),
        ])
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.update()
   */
  private updateExpNode(dlNodeName: string): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("update")
        ),
        []
      )
    )
  }
}
