import { type types as t } from "@babel/core"
import BaseGenerator from "../HelperGenerators/BaseGenerator"
import { TryParticle, type ViewParticle } from "@dlightjs/reactivity-parser"

export default class TryGenerator extends BaseGenerator {
  run() {
    const { children, catchChildren, exception } = this
      .viewParticle as TryParticle

    children.forEach(this.addCatchable.bind(this))

    const dlNodeName = this.generateNodeName()

    // ---- Declare for node
    this.addInitStatement(
      this.declareTryNode(dlNodeName, children, catchChildren, exception)
    )

    // ---- Update statements
    this.addUpdateStatementsWithoutDep(this.declareUpdate(dlNodeName))

    return dlNodeName
  }

  addCatchable(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if ("dependencyIndexArr" in obj[key]) {
          obj[key].value = this.t.callExpression(
            this.t.identifier("$catchable"),
            [obj[key].value]
          )
        } else {
          this.addCatchable(obj[key])
        }
      }
    }
  }

  /**
   * @View
   * $setUpdate($catchable(updateStatements))
   * ${children}
   * return [...${topLevelNodes}]
   */
  private declareTryNodeUpdate(
    children: ViewParticle[],
    addCatchable = true
  ): t.Statement[] {
    const [childStatements, topLevelNodes, updateStatements, nodeIdx] =
      this.generateChildren(children, false, true)

    const updateFunc = this.t.arrowFunctionExpression(
      [this.t.identifier("$changed")],
      this.geneUpdateBody(updateStatements)
    )

    childStatements.unshift(
      ...this.declareNodes(nodeIdx),
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier("$setUpdate"),
          addCatchable
            ? [
                this.t.callExpression(this.t.identifier("$catchable"), [
                  updateFunc,
                ]),
              ]
            : [updateFunc]
        )
      )
    )
    childStatements.push(
      this.t.returnStatement(
        this.t.arrayExpression(
          topLevelNodes.map(node => this.t.identifier(node))
        )
      )
    )

    return childStatements
  }

  /**
   * @View
   * ${dlNodeName} = new TryNode(($setUpdate, $catchable) => {
   *     ${children}
   *   }, ($setUpdate, e) => {
   *     ${catchChildren}
   *  })
   * })
   */
  private declareTryNode(
    dlNodeName: string,
    children: ViewParticle[],
    catchChildren: ViewParticle[],
    exception: TryParticle["exception"]
  ): t.Statement {
    const exceptionNodes = exception ? [exception] : []
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.newExpression(this.t.identifier(this.importMap.TryNode), [
          this.t.arrowFunctionExpression(
            [this.t.identifier("$setUpdate"), this.t.identifier("$catchable")],
            this.t.blockStatement(this.declareTryNodeUpdate(children, true))
          ),
          this.t.arrowFunctionExpression(
            [this.t.identifier("$setUpdate"), ...exceptionNodes],
            this.t.blockStatement(
              this.declareTryNodeUpdate(catchChildren, false)
            )
          ),
        ])
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}?.update(changed)
   */
  private declareUpdate(dlNodeName: string): t.Statement {
    return this.optionalExpression(
      dlNodeName,
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("update")
        ),
        this.updateParams
      )
    )
  }
}
