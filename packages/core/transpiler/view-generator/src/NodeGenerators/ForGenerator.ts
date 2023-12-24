import { type types as t } from "@babel/core"
import BaseGenerator from "../HelperGenerators/BaseGenerator"
import {
  type ForParticle,
  type ViewParticle,
} from "@dlightjs/reactivity-parser"

export default class ForGenerator extends BaseGenerator {
  run() {
    const { item, array, key, children } = this.viewParticle as ForParticle

    const dlNodeName = this.generateNodeName()

    // ---- Declare for node
    this.addInitStatement(
      this.declareForNode(
        dlNodeName,
        array.value,
        item,
        children,
        BaseGenerator.calcDependencyNum(array.dependencyIndexArr),
        key
      )
    )

    // ---- Update statements
    this.addUpdateStatements(
      array.dependencyIndexArr,
      this.updateForNode(dlNodeName, array.value, item, key)
    )
    this.addUpdateStatementsWithoutDep(this.updateForNodeItem(dlNodeName))

    return dlNodeName
  }

  /**
   * @View
   * const ${dlNodeName} = new ForNode(${array}, ${item} => {
   *   ${children}
   *   const $update = (changed, ${item}) => {
   *      if (changed & ${depNum}) {
   *        ${statements}
   *      }
   *      ${statements}
   *   }
   *   ${topLevelNodes[0])._$updateFunc = $update
   *   return [...${topLevelNodes}]
   * }, ${depNum}, ${array}.map(${item} => ${key}))
   */
  private declareForNode(
    dlNodeName: string,
    array: t.Expression,
    item: t.LVal,
    children: ViewParticle[],
    depNum: number,
    key?: t.Expression
  ): t.VariableDeclaration {
    // ---- NodeFunc
    const [childStatements, topLevelNodes, updateStatements] =
      this.generateChildren(children, false)

    // ---- Update func
    if (Object.keys(updateStatements).length > 0) {
      childStatements.push(
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.identifier(topLevelNodes[0]),
              this.t.identifier("_$updateFunc")
            ),
            this.t.arrowFunctionExpression(
              [this.t.identifier("changed"), item as any],
              this.geneUpdateBody(updateStatements)
            )
          )
        )
      )
    }

    // ---- Return statement
    childStatements.push(this.generateReturnStatement(topLevelNodes))

    return this.t.variableDeclaration("const", [
      this.t.variableDeclarator(
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.ForNode), [
          array,
          this.t.arrowFunctionExpression(
            [item as any],
            this.t.blockStatement(childStatements)
          ),
          this.t.numericLiteral(depNum),
          ...this.getForKeyStatement(array, item, key),
        ])
      ),
    ])
  }

  /**
   * @View
   * ${array}.map(${item} => ${key})
   */
  private getForKeyStatement(
    array: t.Expression,
    item: t.LVal,
    key?: t.Expression
  ): t.Expression[] {
    if (key) {
      return [
        this.t.callExpression(
          this.t.memberExpression(array, this.t.identifier("map")),
          [this.t.arrowFunctionExpression([item as any], key)]
        ),
      ]
    }
    return []
  }

  /**
   * @View
   * ${dlNodeName}.updateArray(${array}, ${array}.map(${item} => ${key}))
   */
  private updateForNode(
    dlNodeName: string,
    array: t.Expression,
    item: t.LVal,
    key?: t.Expression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("updateArray")
        ),
        [array, ...this.getForKeyStatement(array, item, key)]
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.update(changed)
   */
  private updateForNodeItem(dlNodeName: string): t.Statement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("update")
        ),
        [this.t.identifier("changed")]
      )
    )
  }
}
