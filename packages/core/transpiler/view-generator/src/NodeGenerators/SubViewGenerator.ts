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
      const allDependencyIndexArr: number[] = []
      let hasOnUpdate: t.Expression | false = false
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (key === "onUpdate") {
          hasOnUpdate = value
          return
        }
        if (
          SubViewGenerator.lifecycle.includes(
            key as (typeof SubViewGenerator.lifecycle)[number]
          )
        ) {
          this.addInitStatement(
            this.addLifecycle(
              dlNodeName,
              key as (typeof SubViewGenerator.lifecycle)[number],
              value
            )
          )
          return
        }
        if (!dependencyIndexArr || dependencyIndexArr.length === 0) return
        allDependencyIndexArr.push(...dependencyIndexArr)
        const depIdx = availableProperties.indexOf(key)
        const propChange = 1 << depIdx
        this.addUpdateStatements(
          dependencyIndexArr,
          this.updateProp(dlNodeName, propChange, key, value)
        )
      })
      if (hasOnUpdate) {
        this.addUpdateStatements(
          allDependencyIndexArr,
          this.addOnUpdate(dlNodeName, hasOnUpdate)
        )
      }
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
   * ${dlNodeName}.updateProp?.(${propChanged}, ...updateParams, { ${key}: ${value} })
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
          this.t.identifier("updateProp")
        ),
        [
          this.t.numericLiteral(propChanged),
          ...this.updateParams.slice(1),
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
        this.updateParams,
        true
      )
    )
  }
}
