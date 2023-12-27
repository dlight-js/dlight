import { type types as t } from "@babel/core"
import { SwitchBranch, SwitchParticle } from "@dlightjs/reactivity-parser"
import CondGenerator from "../HelperGenerators/CondGenerator"

export default class SwitchGenerator extends CondGenerator {
  run() {
    const { branches, discriminant } = this.viewParticle as SwitchParticle

    const deps = branches.flatMap(
      ({ case: _case }) => _case?.dependencyIndexArr ?? []
    )
    deps.push(...(discriminant.dependencyIndexArr ?? []))
    // ---- declareSwitchNode
    const dlNodeName = this.generateNodeName()
    this.addInitStatement(
      this.declareSwitchNode(dlNodeName, discriminant.value, branches)
    )

    this.addUpdateStatements(deps, this.updateCondNodeCond(dlNodeName))
    this.addUpdateStatementsWithoutDep(this.updateCondNode(dlNodeName))

    return dlNodeName
  }

  /**
   * @View
   * _$updates.push((changed) => { ${updateStatements} })
   */
  private geneUpdateFunc(
    updateStatements: Record<number, t.Statement[]>
  ): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier("_$updates"),
          this.t.identifier("push")
        ),
        [
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed")],
            this.geneUpdateBody(updateStatements)
          ),
        ]
      )
    )
  }

  /**
   * @View
   * _$nodes.push(${nodeNames})
   */
  private addNodes(nodeNames: string[]): t.Statement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier("_$nodes"),
          this.t.identifier("push")
        ),
        nodeNames.map(nodeName => this.t.identifier(nodeName))
      )
    )
  }

  /**
   * @View
   * if (_$notSetCond) {
   *  $thisCond.cond = ${idx}
   *  _$notSetCond = false
   * }
   */
  private geneCaseIdx(idx: number): t.IfStatement {
    return this.t.ifStatement(
      this.t.identifier("_$notSetCond"),
      this.t.blockStatement([
        this.geneCondIdx(idx),
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.identifier("_$notSetCond"),
            this.t.booleanLiteral(false)
          )
        ),
      ])
    )
  }

  /**
   * @View
   * const _$nodes = []
   * const _$updates = []
   * let _$notSetCond = true
   */
  private declareSwitchVariables(needToUpdate: boolean): t.Statement[] {
    return [
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier("_$nodes"),
          this.t.arrayExpression([])
        ),
      ]),
      ...(needToUpdate
        ? [
            this.t.variableDeclaration("const", [
              this.t.variableDeclarator(
                this.t.identifier("_$updates"),
                this.t.arrayExpression([])
              ),
            ]),
          ]
        : []),
      this.t.variableDeclaration("let", [
        this.t.variableDeclarator(
          this.t.identifier("_$notSetCond"),
          this.t.booleanLiteral(true)
        ),
      ]),
    ]
  }

  /**
   * @View
   *  _$nodes[0]._$updateFunc = (changed) => {
   *    _$updates.forEach(update => update(changed))
   *  })
   */
  private addUpdateToTheFirstNode(): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.memberExpression(
            this.t.identifier("_$nodes"),
            this.t.numericLiteral(0),
            true
          ),
          this.t.identifier("_$updateFunc")
        ),
        this.t.arrowFunctionExpression(
          [this.t.identifier("changed")],
          this.t.blockStatement([
            this.t.expressionStatement(
              this.t.callExpression(
                this.t.memberExpression(
                  this.t.identifier("_$updates"),
                  this.t.identifier("forEach")
                ),
                [
                  this.t.arrowFunctionExpression(
                    [this.t.identifier("update")],
                    this.t.blockStatement([
                      this.t.expressionStatement(
                        this.t.callExpression(this.t.identifier("update"), [
                          this.t.identifier("changed"),
                        ])
                      ),
                    ])
                  ),
                ]
              )
            ),
          ])
        )
      )
    )
  }

  /**
   * @View
   * const ${dlNodeName} = new CondNode(($thisCond) => {
   *   const _$nodes = []
   *   const _$updates = []
   *   let _$notSetCond = false
   *   switch ($discriminant) {
   *    case ${case0}:
   *      if ($thisCond.case === 0) return
   *    case ${case1}:
   *      if ($thisCond.case === 1) return
   *      return [...${case1Nodes}]
   *    default:
   *      if ($thisCond.case === 2) return
   *  }
   *   _$nodes[0]._$updateFunc = (changed) => {
   *    _$updates.forEach(update => update(changed))
   *  })
   *   return _$nodes
   * })
   */
  private declareSwitchNode(
    dlNodeName: string,
    discriminant: t.Expression,
    branches: SwitchBranch[]
  ): t.Statement {
    let needToUpdate = false
    const switchStatements = branches.map(
      ({ case: _case, break: _break, children }, idx) => {
        // ---- Generate case statements
        const [childStatements, topLevelNodes, updateStatements] =
          this.generateChildren(children, false)

        // ---- Check did case change
        childStatements.unshift(this.geneCondCheck(idx))

        // ---- Add update statements
        if (Object.keys(updateStatements).length > 0) {
          childStatements.push(this.geneUpdateFunc(updateStatements))
          needToUpdate = true
        }

        // ---- Add nodes
        childStatements.push(this.addNodes(topLevelNodes))

        // ---- Add set case
        childStatements.push(this.geneCaseIdx(idx))

        // ---- Add break
        if (_break) childStatements.push(this.t.breakStatement())

        return this.t.switchCase(_case ? _case.value : null, childStatements)
      }
    )

    return this.declareCondNode(
      dlNodeName,
      this.t.blockStatement([
        ...this.declareSwitchVariables(needToUpdate),
        this.t.switchStatement(discriminant, switchStatements),
        ...(needToUpdate ? [this.addUpdateToTheFirstNode()] : []),
        this.t.returnStatement(this.t.identifier("_$nodes")),
      ])
    )
  }
}
