import { type types as t } from "@babel/core"
import { type HTMLParticle } from "@dlightjs/reactivity-parser"
import HTMLPropGenerator from "./HTMLPropGenerator"

export default class HTMLGenerator extends HTMLPropGenerator {
  run() {
    const { tag, props, children } = this.viewParticle as HTMLParticle

    const dlNodeName = this.generateNodeName()
    this.addInitStatement(this.declareHTMLNode(dlNodeName, tag))
    const tagName = this.t.isStringLiteral(tag)
      ? tag.value
      : "ANY"
    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        this.addInitStatement(this.addHTMLProp(dlNodeName, tagName, key, value, dependencyIndexArr))
      })
    }

    // ---- Resolve children
    if (children) {
      const childNames: string[] = []
      children.forEach((child, idx) => {
        const [initStatements, childName] = this.generateChild(child)
        childNames.push(childName)
        this.addInitStatement(...initStatements)
        if (child.type === "html") this.addInitStatement(this.appendChild(dlNodeName, childName))
        else this.addInitStatement(this.insertNode(dlNodeName, childName, idx))
      })
      this.addInitStatement(this.setHTMLNodes(dlNodeName, childNames))
    }

    return dlNodeName
  }

  /**
   * const ${dlNodeName} = createElement(${tag})
   */
  private declareHTMLNode(dlNodeName: string, tag: t.Expression) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.callExpression(
            this.t.identifier(this.importMap.createElement),
            [tag]
          )
        )
      ])
    )
  }

  /**
   * ${dlNodeName}._$nodes = [...${childNames}]
   */
  private setHTMLNodes(dlNodeName: string, childNames: string[]) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$nodes")
          ),
          this.t.arrayExpression(childNames.map(name => this.t.identifier(name)))
        )
      )
    )
  }

  /**
   * ${dlNodeName}.appendChild(${childNodeName})
   */
  private appendChild(dlNodeName: string, childNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("appendChild")
          ),
          [this.t.identifier(childNodeName)]
        )
      )
    )
  }
}
