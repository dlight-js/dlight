import { type types as t } from "@babel/core"
import BaseGenerator from "./BaseGenerator"

export default class CondGenerator extends BaseGenerator {
  /**
   * @View
   * $thisCond.cond = ${idx}
   */
  geneCondIdx(idx: number): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier("$thisCond"),
          this.t.identifier("cond")
        ),
        this.t.numericLiteral(idx)
      )
    )
  }

  /**
   * @View
   * if ($thisCond.cond === ${idx}) return
   */
  geneCondCheck(idx: number): t.IfStatement {
    return this.t.ifStatement(
      this.t.binaryExpression(
        "===",
        this.t.memberExpression(
          this.t.identifier("$thisCond"),
          this.t.identifier("cond")
        ),
        this.t.numericLiteral(idx)
      ),
      this.t.returnStatement()
    )
  }

  /**
   * @View
   * ${dlNodeName}.updateCond()
   */
  updateCondNodeCond(dlNodeName: string): t.ExpressionStatement {
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
  updateCondNode(dlNodeName: string): t.ExpressionStatement {
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

  /**
   * @View
   * const ${dlNodeName} = new CondNode(($thisCond) => {})
   */
  declareCondNode(
    dlNodeName: string,
    condFunc: t.BlockStatement
  ): t.VariableDeclaration {
    return this.t.variableDeclaration("const", [
      this.t.variableDeclarator(
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier("CondNode"), [
          this.t.arrowFunctionExpression(
            [this.t.identifier("$thisCond")],
            condFunc
          ),
        ])
      ),
    ])
  }
}
