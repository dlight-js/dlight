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

    this.addInitStatement(
      this.declareExpNode(dlNodeName, content.value, content.dependenciesNode)
    )

    if (content.dynamic) {
      this.addUpdateStatements(
        content.dependencyIndexArr,
        this.updateExpNode(dlNodeName, content.value, content.dependenciesNode)
      )
    }

    if (props) {
      Object.entries(props).forEach(([key, { value }]) => {
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
        if (key === "ref") {
          return this.addInitStatement(this.initElement(dlNodeName, value))
        }
        if (key === "elements") {
          return this.addInitStatement(
            this.initElement(dlNodeName, value, true)
          )
        }
        if (key === "didUpdate") {
          return this.addUpdateStatements(
            content.dependencyIndexArr,
            this.addOnUpdate(dlNodeName, value)
          )
        }
        DLError.warn1(key)
      })
    }

    return dlNodeName
  }

  /**
   * @View
   * ${dlNodeName} = new ExpNode(${value}, dependenciesNode)
   */
  private declareExpNode(
    dlNodeName: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.ExpNode), [
          value,
          dependenciesNode ?? this.t.nullLiteral(),
        ])
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.update(() => value, dependenciesNode)
   */
  private updateExpNode(
    dlNodeName: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression
  ): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("update")
        ),
        [
          this.t.arrowFunctionExpression([], value),
          dependenciesNode ?? this.t.nullLiteral(),
        ]
      )
    )
  }
}
