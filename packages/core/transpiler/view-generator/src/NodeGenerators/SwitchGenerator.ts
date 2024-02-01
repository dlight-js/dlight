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
      ...this.declareSwitchNode(dlNodeName, discriminant.value, branches, deps)
    )

    this.addUpdateStatements(deps, this.updateCondNodeCond(dlNodeName))
    this.addUpdateStatementsWithoutDep(this.updateCondNode(dlNodeName))

    return dlNodeName
  }

  /**
   * @View
   * const ${dlNodeName} = new CondNode(($thisCond) => {
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
    branches: SwitchBranch[],
    deps: number[]
  ): t.Statement[] {
    // ---- Format statements, make fallthrough statements append to the previous case
    const formattedBranches: SwitchBranch[] = branches.map(
      ({ case: _case, break: _break, children }, idx) => {
        if (!_break) {
          for (let i = idx + 1; i < branches.length; i++) {
            children.push(...branches[i].children)
            if (branches[i].break) break
          }
        }
        return { case: _case, break: _break, children }
      }
    )
    // ---- Add default case
    const defaultCaseIdx = formattedBranches.findIndex(
      ({ case: _case }) => _case === null
    )
    if (defaultCaseIdx === -1) {
      formattedBranches.push({
        case: null,
        break: true,
        children: [],
      })
    }

    const switchStatements = formattedBranches.map(
      ({ case: _case, children }, idx) => {
        // ---- Generate case statements
        const [childStatements, topLevelNodes, updateStatements, nodeIdx] =
          this.generateChildren(children, false, true)

        const updateNode = []
        if (Object.keys(updateStatements).length > 0) {
          updateNode.push(
            /**
             * $thisCond.updateFunc = (changed) => { ${updateStatements} }
             */
            this.t.expressionStatement(
              this.t.assignmentExpression(
                "=",
                this.t.memberExpression(
                  this.t.identifier("$thisCond"),
                  this.t.identifier("updateFunc")
                ),
                this.t.arrowFunctionExpression(
                  this.updateParams,
                  this.geneUpdateBody(updateStatements)
                )
              )
            )
          )
        }

        // ---- Update func
        childStatements.unshift(...this.declareNodes(nodeIdx), ...updateNode)

        // ---- Check cond and update cond
        childStatements.unshift(this.geneCondCheck(idx), this.geneCondIdx(idx))

        // ---- Return statement
        childStatements.push(this.geneCondReturnStatement(topLevelNodes, idx))

        return this.t.switchCase(_case ? _case.value : null, [
          this.t.blockStatement(childStatements),
        ])
      }
    )

    return this.declareCondNode(
      dlNodeName,
      this.t.blockStatement([
        this.t.switchStatement(discriminant, switchStatements),
      ]),
      deps
    )
  }
}
