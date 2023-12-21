import { type types as t } from "@babel/core"
import BaseGenerator from "./BaseGenerator"
import { type IfParticle, type IfBranch } from "@dlightjs/reactivity-parser"

export default class IfGenerator extends BaseGenerator {
  run() {
    const ifParticle = this.viewParticle as IfParticle
    // ---- declareIfNode
    const dlNodeName = this.generateNodeName()
    this.addInitStatement(this.declareIfNode(dlNodeName, ifParticle.branches))

    const deps = ifParticle.branches.flatMap(({ condition }) => condition.dependencyIndexArr ?? [])
    this.addUpdateStatements(deps, [this.updateIfNodeCond(dlNodeName)])
    this.addUpdateStatementsWithoutDep([this.updateIfNode(dlNodeName)])

    return dlNodeName
  }

  private geneUpdateFunc(firstNode: string, updateStatements: Record<number, t.Statement[]>) {
    return (
      this.t.expressionStatement(
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
    )
  }

  /**
   * ${firstNode}._$cond = ${idx}
   */
  private geneCondIdx(firstNode: string, idx: number) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(firstNode),
            this.t.identifier("cond")
          ),
          this.t.numericLiteral(idx)
        )
      )
    )
  }

  private geneCondCheck(idx: number) {
    return (
      this.t.ifStatement(
        this.t.binaryExpression(
          "===",
          this.t.memberExpression(
            this.t.identifier("$thisIf"),
            this.t.identifier("cond")
          ),
          this.t.numericLiteral(idx)
        ),
        this.t.returnStatement()
      )
    )
  }

  geneIfStatement(test: t.Expression, body: t.Statement[], alternate: t.Statement) {
    return this.t.ifStatement(test, this.t.blockStatement(body), alternate)
  }

  /**
   * const ${dlNodeName} = new IfNode(($thisIf) => {
   *   if (cond1) {
   *    if ($thisIf.cond === 0) return
   *    ${children}
   *    thisIf.cond = 0
   *    node0.update = () => {}
   *    return [nodes]
   *   } else if (cond2) {
   *    if ($thisIf.cond === 1) return
   *    ${children}
   *    thisIf.cond = 1
   *    return [nodes]
   *   }
   *  return []
   * })
   */
  private declareIfNode(dlNodeName: string, branches: IfBranch[]) {
    const ifStatement = branches.toReversed().reduce<any>((acc, { condition, children }, idx) => {
      // ---- Generate children
      const [childStatements, topLevelNodes, updateStatements] = this.generateChildren(children, false)

      // ---- Check cond statement
      childStatements.unshift(this.geneCondCheck(branches.length - idx - 1))

      // ---- Update func
      if (Object.keys(updateStatements).length > 0) {
        childStatements.push(this.geneUpdateFunc(topLevelNodes[0], updateStatements))
      }

      // ---- Cond idx (reverse order)
      childStatements.push(this.geneCondIdx("$thisIf", branches.length - idx - 1))

      // ---- Return statement
      childStatements.push(this.generateReturnStatement(topLevelNodes))

      if (idx === 0 && this.t.isBooleanLiteral(condition.value, { value: true })) {
        // ---- else statement
        return this.t.blockStatement(childStatements)
      }

      return this.geneIfStatement(condition.value, childStatements, acc)
    }, undefined)

    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(this.importMap.IfNode), [
              this.t.arrowFunctionExpression(
                [this.t.identifier("$thisIf")],
                this.t.blockStatement([
                  ifStatement,
                  this.t.returnStatement(this.t.arrayExpression([]))
                ])
              )
            ]
          )
        )
      ])
    )
  }

  /**
   *  ${dlNodeName}.updateCond()
   */
  private updateIfNodeCond(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("updateCond")
          ),
          []
        )
      )
    )
  }

  /**
   *  ${dlNodeName}.update(changed)
   */
  private updateIfNode(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("update")
          ),
          [this.t.identifier("changed")]
        )
      )
    )
  }
}
