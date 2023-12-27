import { type types as t } from "@babel/core"
import { type IfParticle, type IfBranch } from "@dlightjs/reactivity-parser"
import CondGenerator from "../HelperGenerators/CondGenerator"

export default class IfGenerator extends CondGenerator {
  run() {
    const { branches } = this.viewParticle as IfParticle
    const deps = branches.flatMap(
      ({ condition }) => condition.dependencyIndexArr ?? []
    )
    // ---- declareIfNode
    const dlNodeName = this.generateNodeName()
    this.addInitStatement(this.declareIfNode(dlNodeName, branches))

    this.addUpdateStatements(deps, this.updateCondNodeCond(dlNodeName))
    this.addUpdateStatementsWithoutDep(this.updateCondNode(dlNodeName))

    return dlNodeName
  }

  /**
   * @View
   * ${firstNode}._$updateFunc = (changed) => { ${updateStatements} }
   */
  private geneUpdateFunc(
    firstNode: string,
    updateStatements: Record<number, t.Statement[]>
  ): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier(firstNode),
          this.t.identifier("_$updateFunc")
        ),
        this.t.arrowFunctionExpression(
          [this.t.identifier("changed")],
          this.geneUpdateBody(updateStatements)
        )
      )
    )
  }

  /**
   * @View
   * if (${test}) { ${body} } else { ${alternate} }
   */
  geneIfStatement(
    test: t.Expression,
    body: t.Statement[],
    alternate: t.Statement
  ): t.IfStatement {
    return this.t.ifStatement(test, this.t.blockStatement(body), alternate)
  }

  /**
   * @View
   * const ${dlNodeName} = new IfNode(($thisCond) => {
   *   if (cond1) {
   *    if ($thisCond.cond === 0) return
   *    ${children}
   *    $thisCond.cond = 0
   *    node0.update = () => {}
   *    return [nodes]
   *   } else if (cond2) {
   *    if ($thisCond.cond === 1) return
   *    ${children}
   *    $thisCond.cond = 1
   *    return [nodes]
   *   }
   * })
   */
  private declareIfNode(dlNodeName: string, branches: IfBranch[]): t.Statement {
    const ifStatement = branches
      .reverse()
      .reduce<any>((acc, { condition, children }, idx) => {
        // ---- Generate children
        const [childStatements, topLevelNodes, updateStatements] =
          this.generateChildren(children, false)

        // ---- Check cond statement
        childStatements.unshift(this.geneCondCheck(branches.length - idx - 1))

        // ---- Update func
        if (Object.keys(updateStatements).length > 0) {
          childStatements.push(
            this.geneUpdateFunc(topLevelNodes[0], updateStatements)
          )
        }

        // ---- Cond idx (reverse order)
        childStatements.push(this.geneCondIdx(branches.length - idx - 1))

        // ---- Return statement
        childStatements.push(this.generateReturnStatement(topLevelNodes))

        if (idx === 0) {
          if (this.t.isBooleanLiteral(condition.value, { value: true })) {
            // ---- else statement
            return this.t.blockStatement(childStatements)
          }
          /**
           * else {
           *  thisCond.cond = -1
           *  return []
           * }
           */
          return this.geneIfStatement(
            condition.value,
            childStatements,
            this.t.blockStatement([
              this.geneCondIdx(-1),
              this.generateReturnStatement([]),
            ])
          )
        }
        return this.geneIfStatement(condition.value, childStatements, acc)
      }, undefined)

    return this.declareCondNode(
      dlNodeName,
      this.t.blockStatement([ifStatement])
    )
  }
}
