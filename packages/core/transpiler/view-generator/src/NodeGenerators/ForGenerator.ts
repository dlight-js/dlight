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
      ...this.declareForNode(
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
   * ${dlNodeName} = new ForNode(${array}, ${depNum}, ${array}.map(${item} => ${key}))
   * ${dlNodeName}.addNodeFunc((${item}, $updateArr, idx) => {
   *   $updateArr[idx] = (changed, ${item}) => { {$updateStatements} }
   *   ${children}
   *   return [...${topLevelNodes}]
   * })
   */
  private declareForNode(
    dlNodeName: string,
    array: t.Expression,
    item: t.LVal,
    children: ViewParticle[],
    depNum: number,
    key?: t.Expression
  ): t.Statement[] {
    // ---- NodeFunc
    const [childStatements, topLevelNodes, updateStatements, nodeIdx] =
      this.generateChildren(children, false, true)

    // ---- Update func
    childStatements.unshift(
      ...this.declareNodes(nodeIdx),
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier("$updateArr"),
            this.t.identifier("$idx"),
            true
          ),
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed"), item as any],
            this.geneUpdateBody(updateStatements)
          )
        )
      )
    )

    // ---- Return statement
    childStatements.push(this.generateReturnStatement(topLevelNodes))

    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.identifier(dlNodeName),
          this.t.newExpression(this.t.identifier(this.importMap.ForNode), [
            array,
            this.t.numericLiteral(depNum),
            ...this.getForKeyStatement(array, item, key),
          ])
        )
      ),
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("addNodeFunc")
          ),
          [
            this.t.arrowFunctionExpression(
              [
                item as any,
                this.t.identifier("$updateArr"),
                this.t.identifier("$idx"),
              ],
              this.t.blockStatement(childStatements)
            ),
          ]
        )
      ),
    ]
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
    return this.optionalExpression(
      dlNodeName,
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
   * ${dlNodeName}?.update(changed)
   */
  private updateForNodeItem(dlNodeName: string): t.Statement {
    return this.optionalExpression(
      dlNodeName,
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
