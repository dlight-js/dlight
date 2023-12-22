import { type types as t } from "@babel/core"
import { type ViewParticle, type DependencyProp, type EnvParticle } from "@dlightjs/reactivity-parser"
import BaseGenerator from "../HelperGenerators/BaseGenerator"

export default class EnvGenerator extends BaseGenerator {
  run() {
    let { props, children } = this.viewParticle as EnvParticle
    props = this.alterPropViews(props)!

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(this.declareEnvNode(dlNodeName, props))

    // ---- Children
    this.addInitStatement(this.geneEnvChildren(dlNodeName, children))

    // ---- Update props
    Object.entries(props).forEach(([key, { dependencyIndexArr, value }]) => {
      if (!dependencyIndexArr) return
      this.addUpdateStatements(dependencyIndexArr, [this.updateEnvNode(dlNodeName, key, value)])
    })

    return dlNodeName
  }

  private generateEnvs(props: Record<string, DependencyProp>) {
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

  /**
   * const ${dlNodeName} = new EnvNode(envs)
   */
  private declareEnvNode(dlNodeName: string, props: Record<string, DependencyProp>) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier("EnvNode"),
            [this.generateEnvs(props)]
          )
        )
      ])
    )
  }

  /**
   * ${dlNodeName}.initNodes([${childrenNames}])
   */
  private geneEnvChildren(dlNodeName: string, children: ViewParticle[]) {
    const [statements, childrenNames] = this.generateChildren(children)
    this.addInitStatement(...statements)
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("initNodes")
          ),
          [this.t.arrayExpression(childrenNames.map(name => this.t.identifier(name)))]
        )
      )
    )
  }

  /**
   * ${dlNodeName}.updateEnv(${key}, ${value})
   */
  private updateEnvNode(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("updateEnv")
          ),
          [
            this.t.stringLiteral(key),
            value
          ]
        )
      )
    )
  }
}
