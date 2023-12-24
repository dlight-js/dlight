import { type types as t } from "@babel/core"
import BaseGenerator from "../HelperGenerators/BaseGenerator"
import { type IfParticle, type IfBranch } from "@dlightjs/reactivity-parser"

export default class IfGenerator extends BaseGenerator {
  run() {
    const ifParticle = this.viewParticle as IfParticle
    // ---- declareIfNode
    const dlNodeName = this.generateNodeName()
    this.addInitStatement(this.declareIfNode(dlNodeName, ifParticle.branches))

    const deps = ifParticle.branches.flatMap(
      ({ condition }) => condition.dependencyIndexArr ?? []
    )
    this.addUpdateStatements(deps, this.updateIfNodeCond(dlNodeName))
    this.addUpdateStatementsWithoutDep(this.updateIfNode(dlNodeName))

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
   * ${firstNode}._$cond = ${idx}
   */
  private geneCondIdx(firstNode: string, idx: number): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier(firstNode),
          this.t.identifier("cond")
        ),
        this.t.numericLiteral(idx)
      )
    )
  }

  /**
   * @View
   * if ($thisIf.cond === ${idx}) return
   */
  private geneCondCheck(idx: number): t.IfStatement {
    return this.t.ifStatement(
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
   * })
   */
  private declareIfNode(dlNodeName: string, branches: IfBranch[]): t.Statement {
    let hasElseStatement = false

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
        childStatements.push(
          this.geneCondIdx("$thisIf", branches.length - idx - 1)
        )

        // ---- Return statement
        childStatements.push(this.generateReturnStatement(topLevelNodes))

        if (
          idx === 0 &&
          this.t.isBooleanLiteral(condition.value, { value: true })
        ) {
          // ---- else statement
          hasElseStatement = true
          return this.t.blockStatement(childStatements)
        }

        return this.geneIfStatement(condition.value, childStatements, acc)
      }, undefined)

    if (!hasElseStatement) {
      /**
       * else {
       *  thisIf.cond = -1
       *  return []
       * }
       */
      ifStatement.alternate = this.t.blockStatement([
        this.geneCondIdx("$thisIf", -1),
        this.t.returnStatement(this.t.arrayExpression([])),
      ])
    }

    return this.t.variableDeclaration("const", [
      this.t.variableDeclarator(
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.IfNode), [
          this.t.arrowFunctionExpression(
            [this.t.identifier("$thisIf")],
            this.t.blockStatement([ifStatement])
          ),
        ])
      ),
    ])
  }

  /**
   * @View
   * ${dlNodeName}.updateCond()
   */
  private updateIfNodeCond(dlNodeName: string): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("updateCond")
        ),
        []
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.update(changed)
   */
  private updateIfNode(dlNodeName: string): t.ExpressionStatement {
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