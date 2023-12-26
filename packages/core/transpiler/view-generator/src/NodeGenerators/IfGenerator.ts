import { type types as t } from "@babel/core"
import BaseGenerator from "../HelperGenerators/BaseGenerator"
import { type IfParticle, type IfBranch } from "@dlightjs/reactivity-parser"

export default class IfGenerator extends BaseGenerator {
  run() {
    const { branches } = this.viewParticle as IfParticle
    const deps = branches.flatMap(
      ({ condition }) => condition.dependencyIndexArr ?? []
    )
    // ---- declareIfNode
    const dlNodeName = this.generateNodeName()
    this.addInitStatement(
      this.declareIfNode(
        dlNodeName,
        branches,
        BaseGenerator.calcDependencyNum(deps)
      )
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
   * }, ${depNum})
   */
  private declareIfNode(
    dlNodeName: string,
    branches: IfBranch[],
    depNum: number
  ): t.Statement {
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

        if (idx === 0) {
          if (this.t.isBooleanLiteral(condition.value, { value: true })) {
            // ---- else statement
            return this.t.blockStatement(childStatements)
          }
          /**
           * else {
           *  thisIf.cond = -1
           *  return []
           * }
           */
          return this.geneIfStatement(
            condition.value,
            childStatements,
            this.t.blockStatement([
              this.geneCondIdx("$thisIf", -1),
              this.generateReturnStatement([]),
            ])
          )
        }
        return this.geneIfStatement(condition.value, childStatements, acc)
      }, undefined)

    return this.t.variableDeclaration("const", [
      this.t.variableDeclarator(
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.IfNode), [
          this.t.arrowFunctionExpression(
            [this.t.identifier("$thisIf")],
            this.t.blockStatement([ifStatement])
          ),
          this.t.numericLiteral(depNum),
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
