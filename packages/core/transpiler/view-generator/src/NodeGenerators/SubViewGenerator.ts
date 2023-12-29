import {
  type DependencyProp,
  type SubviewParticle,
} from "@dlightjs/reactivity-parser"
import type { types as t } from "@babel/core"
import PropViewGenerator from "../HelperGenerators/PropViewGenerator"

export default class SubViewGenerator extends PropViewGenerator {
  run() {
    let { props } = this.viewParticle as SubviewParticle
    props = this.alterPropViews(props)
    const { tag } = this.viewParticle as SubviewParticle

    const dlNodeName = this.generateNodeName()

    this.addInitStatement(
      ...this.declareSubviewNode(dlNodeName, tag, props ?? {})
    )

    const availableProperties = this.subViewPropMap[tag] ?? []

    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (!dependencyIndexArr || dependencyIndexArr.length === 0) return
        const depIdx = availableProperties.indexOf(key)
        const propChange = 1 << depIdx
        this.addUpdateStatements(
          dependencyIndexArr,
          this.updateProp(dlNodeName, propChange, key, value)
        )
      })
    }
    this.addUpdateStatementsWithoutDep(this.updateSubView(dlNodeName))

    return dlNodeName
  }

  /**
   * @View
   * { ${key}: ${value}, ... }
   */
  private genePropNode(props: Record<string, DependencyProp>): t.Expression {
    return this.t.objectExpression(
      Object.entries(props).map(([key, prop]) => {
        return this.t.objectProperty(this.t.identifier(key), prop.value)
      })
    )
  }

  /**
   * @View
   * ${dlNodeName} = new SubViewNode()
   * this.${tag}({${props}}, ${dlNodeName})
   */
  private declareSubviewNode(
    dlNodeName: string,
    tag: string,
    props: Record<string, DependencyProp>
  ): t.Statement[] {
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(this.importMap.SubViewNode),
            []
          )
        )
      ),
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier(tag)
          ),
          [this.genePropNode(props), this.t.identifier(dlNodeName)]
        )
      ),
    ]
  }

  /**
   * @View
   * ${dlNodeName}.updateProp?.(${propChanged}, { ${key}: ${value} })
   */
  private updateProp(
    dlNodeName: string,
    propChanged: number,
    key: string,
    value: t.Expression
  ): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.optionalCallExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("updateProp"),
          undefined,
          true
        ),
        [
          this.t.numericLiteral(propChanged),
          this.t.objectExpression([
            this.t.objectProperty(this.t.identifier(key), value),
          ]),
        ],
        true
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.update(changed)
   */
  private updateSubView(dlNodeName: string): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.optionalCallExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("update")
        ),
        [this.t.identifier("changed")],
        true
      )
    )
  }
}
