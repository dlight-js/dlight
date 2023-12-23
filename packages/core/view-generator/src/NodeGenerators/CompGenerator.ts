import { type types as t } from "@babel/core"
import { type DependencyProp, type CompParticle, type ViewParticle } from "@dlightjs/reactivity-parser"
import ForwardPropGenerator from "../HelperGenerators/ForwardPropGenerator"

export default class CompGenerator extends ForwardPropGenerator {
  run() {
    const compParticle = this.viewParticle as CompParticle

    const dlNodeName = this.generateNodeName()

    let { tag, content, props, children } = compParticle
    content = this.alterPropView(content)
    props = this.alterPropViews(props)

    this.addInitStatement(this.declareCompNode(dlNodeName, tag, content, props, children))
    // ---- Resolve content
    if (content) {
      const { value, dependencyIndexArr } = content
      if (dependencyIndexArr && dependencyIndexArr.length > 0) {
        this.addUpdateStatements(dependencyIndexArr, [this.setCompContent(dlNodeName, value)])
      }
    }

    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (key === "do") {
          const statement = this.addDo(dlNodeName, value)
          this.addInitStatement(statement)
          this.addUpdateStatements(dependencyIndexArr, [statement])
          return
        }
        if (key === "element") {
          const statement = this.setElement(dlNodeName, value, true)
          this.addInitStatement(statement)
          this.addUpdateStatements(dependencyIndexArr, [statement])
          return
        }
        if (key === "forwardProps") {
          const statement = this.forwardProp(dlNodeName)
          this.addInitStatement(statement)
          return
        }
        if (dependencyIndexArr && dependencyIndexArr.length > 0) {
          this.addUpdateStatements(dependencyIndexArr, [this.setCompProp(dlNodeName, key, value)])
        }
      })
    }

    return dlNodeName
  }

  private generateCompProps(props?: Record<string, DependencyProp>) {
    if (!props || Object.keys(props).length === 0) return this.t.nullLiteral()
    return (
      this.t.objectExpression(
        Object.entries(props).map(([key, { value }]) => (
          this.t.objectProperty(
            this.t.identifier(key),
            value
          )
        ))
      )
    )
  }

  private generateCompContent(content?: DependencyProp) {
    if (!content) return this.t.nullLiteral()
    return content.value
  }

  /**
   * const ${dlNodeName} = new ${tag}(props, content, children)
   */
  private declareCompNode(dlNodeName: string, tag: t.Expression, content?: DependencyProp, props?: Record<string, DependencyProp>, children?: ViewParticle[]) {
    if (props) {
      props = Object.fromEntries(
        Object.entries(props)
          .filter(([key]) => !["do", "element"].includes(key))
      )
    }
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            tag, [
              this.generateCompProps(props),
              this.generateCompContent(content),
              children && children.length > 0
                ? this.t.identifier(this.declarePropView(children))
                : this.t.nullLiteral()
            ])
        )
      ])
    )
  }

  /**
   * ${dlNodeName}._$setContent(${value})
   */
  private setCompContent(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$setContent")
          ),
          [value]
        )
      )
    )
  }

  /**
   * ${dlNodeName}._$setProp(${key}, ${value})
   */
  private setCompProp(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$setProp")
          ),
          [this.t.stringLiteral(key), value]
        )
      )
    )
  }
}
