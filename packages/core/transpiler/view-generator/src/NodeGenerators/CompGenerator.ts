import { type types as t } from "@babel/core"
import {
  type DependencyProp,
  type CompParticle,
  type ViewParticle,
} from "@dlightjs/reactivity-parser"
import ForwardPropGenerator from "../HelperGenerators/ForwardPropGenerator"

export default class CompGenerator extends ForwardPropGenerator {
  run() {
    let { props } = this.viewParticle as CompParticle
    props = this.alterPropViews(props)
    const { tag, children } = this.viewParticle as CompParticle

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(
      ...this.declareCompNode(dlNodeName, tag, props, children)
    )
    const allDependencyIndexArr: number[] = []

    // ---- Resolve props
    Object.entries(props).forEach(
      ([key, { value, dependencyIndexArr, dependenciesNode }]) => {
        if (key === "forwardProps") return
        if (key === "didUpdate") return
        allDependencyIndexArr.push(...dependencyIndexArr)
        if (
          CompGenerator.lifecycle.includes(
            key as (typeof CompGenerator.lifecycle)[number]
          )
        ) {
          this.addInitStatement(
            this.addLifecycle(
              dlNodeName,
              key as (typeof CompGenerator.lifecycle)[number],
              value
            )
          )
          return
        }
        if (key === "element") {
          this.addInitStatement(this.initElement(dlNodeName, value, true))
          return
        }
        if (key === "_$content") {
          this.addUpdateStatements(
            dependencyIndexArr,
            this.setCompContent(dlNodeName, value, dependenciesNode)
          )
          return
        }

        this.addUpdateStatements(
          dependencyIndexArr,
          this.setCompProp(dlNodeName, key, value, dependenciesNode)
        )
      }
    )

    // ---- Add addUpdate last
    if (props.didUpdate) {
      this.addUpdateStatements(
        allDependencyIndexArr,
        this.addOnUpdate(dlNodeName, props.didUpdate.value)
      )
    }

    return dlNodeName
  }

  /**
   * @View
   * null
   *  or
   * [[prop1, value1, deps1], [prop2, value2, deps2], ...
   */
  private generateCompProps(
    props: Record<string, DependencyProp>
  ): t.Expression {
    if (Object.keys(props).length === 0) return this.t.nullLiteral()
    return this.t.arrayExpression(
      Object.entries(props).map(([key, { value, dependenciesNode }]) => {
        return this.t.arrayExpression([
          this.t.stringLiteral(key),
          value,
          dependenciesNode,
        ])
      })
    )
  }

  /**
   * @View
   * ${dlNodeName} = new ${tag}()
   * ${dlNodeName}._$init(${props}, ${content}, ${children}, ${this})
   */
  private declareCompNode(
    dlNodeName: string,
    tag: t.Expression,
    props: Record<string, DependencyProp>,
    children: ViewParticle[]
  ): t.Statement[] {
    const willForwardProps = "forwardProps" in props
    props = Object.fromEntries(
      Object.entries(props).filter(
        ([key]) => !["do", "element", "forwardProps", "_$content"].includes(key)
      )
    )

    const content = props._$content

    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.identifier(dlNodeName),
          this.t.newExpression(tag, [])
        )
      ),
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$init")
          ),
          [
            this.generateCompProps(props),
            content
              ? this.t.arrayExpression([
                  content.value,
                  content.dependenciesNode,
                ])
              : this.t.nullLiteral(),
            children.length > 0
              ? this.t.identifier(this.declarePropView(children))
              : this.t.nullLiteral(),
            willForwardProps ? this.t.identifier("this") : this.t.nullLiteral(),
          ]
        )
      ),
    ]
  }

  /**
   * @View
   * ${dlNodeName}._$setContent(() => ${value}, ${dependenciesNode})
   */
  private setCompContent(
    dlNodeName: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression
  ): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("_$setContent")
        ),
        [this.t.arrowFunctionExpression([], value), dependenciesNode]
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}._$setProp(${key}, () => ${value}, ${dependenciesNode})
   */
  private setCompProp(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression
  ): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("_$setProp")
        ),
        [
          this.t.stringLiteral(key),
          this.t.arrowFunctionExpression([], value),
          dependenciesNode,
        ]
      )
    )
  }
}
