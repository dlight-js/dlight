import { type types as t } from "@babel/core"
import {
  type ViewParticle,
  type DependencyProp,
  type EnvParticle,
} from "@dlightjs/reactivity-parser"
import PropViewGenerator from "../HelperGenerators/PropViewGenerator"

export default class EnvGenerator extends PropViewGenerator {
  run() {
    let { props } = this.viewParticle as EnvParticle
    props = this.alterPropViews(props)!
    const { children } = this.viewParticle as EnvParticle

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(this.declareEnvNode(dlNodeName, props))

    // ---- Children
    this.addInitStatement(this.geneEnvChildren(dlNodeName, children))

    // ---- Update props
    Object.entries(props).forEach(
      ([key, { dependencyIndexArr, value, dependenciesNode }]) => {
        if (!dependencyIndexArr) return
        this.addUpdateStatements(
          dependencyIndexArr,
          this.updateEnvNode(dlNodeName, key, value, dependenciesNode)
        )
      }
    )

    return dlNodeName
  }

  /**
   * @View
   * { ${key}: ${value}, ... }
   * { ${key}: ${deps}, ... }
   */
  private generateEnvs(props: Record<string, DependencyProp>): t.Expression[] {
    return [
      this.t.objectExpression(
        Object.entries(props).map(([key, { value }]) =>
          this.t.objectProperty(this.t.identifier(key), value)
        )
      ),
      this.t.objectExpression(
        Object.entries(props)
          .map(
            ([key, { dependenciesNode }]) =>
              dependenciesNode &&
              this.t.objectProperty(this.t.identifier(key), dependenciesNode)
          )
          .filter(Boolean) as t.ObjectProperty[]
      ),
    ]
  }

  /**
   * @View
   * ${dlNodeName} = new EnvNode(envs)
   */
  private declareEnvNode(
    dlNodeName: string,
    props: Record<string, DependencyProp>
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.newExpression(
          this.t.identifier(this.importMap.EnvNode),
          this.generateEnvs(props)
        )
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.initNodes([${childrenNames}])
   */
  private geneEnvChildren(
    dlNodeName: string,
    children: ViewParticle[]
  ): t.Statement {
    const [statements, childrenNames] = this.generateChildren(children)
    this.addInitStatement(...statements)
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("initNodes")
        ),
        [
          this.t.arrayExpression(
            childrenNames.map(name => this.t.identifier(name))
          ),
        ]
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.updateEnv(${key}, () => ${value}, ${dependenciesNode})
   */
  private updateEnvNode(
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
          this.t.identifier("updateEnv")
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
