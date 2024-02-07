import { type types as t } from "@babel/core"
import {
  type DependencyProp,
  type CompParticle,
  type ViewParticle,
} from "@dlightjs/reactivity-parser"
import ForwardPropGenerator from "../HelperGenerators/ForwardPropGenerator"

export default class CompGenerator extends ForwardPropGenerator {
  run() {
    let { content, props } = this.viewParticle as CompParticle
    content = this.alterPropView(content)
    props = this.alterPropViews(props)
    const { tag, children } = this.viewParticle as CompParticle

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(
      ...this.declareCompNode(dlNodeName, tag, content, props, children)
    )
    const allDependencyIndexArr: number[] = []
    // ---- Resolve content
    if (content) {
      const { value, dependencyIndexArr, dependenciesNode } = content
      if (dependencyIndexArr && dependencyIndexArr.length > 0) {
        allDependencyIndexArr.push(...dependencyIndexArr)
        this.addUpdateStatements(
          dependencyIndexArr,
          this.setCompContent(dlNodeName, value, dependenciesNode)
        )
      }
    }

    // ---- Resolve props
    if (props) {
      let hasOnUpdate: t.Expression | false = false
      Object.entries(props).forEach(
        ([key, { value, dependencyIndexArr, dependenciesNode }]) => {
          if (key === "forwardProps") return
          if (key === "didUpdate") {
            hasOnUpdate = value
            return
          }
          allDependencyIndexArr.push(...(dependencyIndexArr ?? []))
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
            const updateStatement = this.updateElement(dlNodeName, value, true)
            if (updateStatement)
              this.addUpdateStatements(dependencyIndexArr, updateStatement)
            return
          }

          if (dependencyIndexArr && dependencyIndexArr.length > 0) {
            this.addUpdateStatements(
              dependencyIndexArr,
              this.setCompProp(dlNodeName, key, value, dependenciesNode)
            )
          }
        }
      )
      if (hasOnUpdate) {
        this.addUpdateStatements(
          allDependencyIndexArr,
          this.addOnUpdate(dlNodeName, hasOnUpdate)
        )
      }
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
    props?: Record<string, DependencyProp>
  ): t.Expression {
    if (!props || Object.keys(props).length === 0) return this.t.nullLiteral()
    return this.t.arrayExpression(
      Object.entries(props).map(([key, { value, dependenciesNode }]) => {
        const depNode = dependenciesNode ?? this.t.nullLiteral()
        return this.t.arrayExpression([
          this.t.stringLiteral(key),
          value,
          depNode,
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
    content?: DependencyProp,
    props?: Record<string, DependencyProp>,
    children?: ViewParticle[]
  ): t.Statement[] {
    let willForwardProps = false
    if (props) {
      if ("forwardProps" in props) willForwardProps = true
      props = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) => !["do", "element", "forwardProps"].includes(key)
        )
      )
    }
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
                  content.dependenciesNode ?? this.t.nullLiteral(),
                ])
              : this.t.nullLiteral(),
            children && children.length > 0
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
    dependenciesNode?: t.ArrayExpression
  ): t.Statement {
    const depNode =
      dependenciesNode && dependenciesNode.elements.length
        ? [dependenciesNode]
        : []
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("_$setContent")
        ),
        [this.t.arrowFunctionExpression([], value), ...depNode]
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
    dependenciesNode?: t.ArrayExpression
  ): t.Statement {
    const depNode =
      dependenciesNode && dependenciesNode.elements.length
        ? [dependenciesNode]
        : []
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
          ...depNode,
        ]
      )
    )
  }
}
