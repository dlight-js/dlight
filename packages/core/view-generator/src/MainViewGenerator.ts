import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import ViewGenerator from "./ViewGenerator"

export default class MainViewGenerator extends ViewGenerator {
  generate(viewParticles: ViewParticle[]): [t.BlockStatement, t.ClassProperty[], number] {
    const allClassProperties: t.ClassProperty[] = []
    const allInitStatements: t.Statement[] = []
    const allUpdateStatements: Record<number, t.Statement[]> = {}
    const topLevelNodes: string[] = []

    viewParticles.forEach(viewParticle => {
      const [initStatements, updateStatements, classProperties, nodeName] = this.generateChild(viewParticle)
      allInitStatements.push(...initStatements)
      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!allUpdateStatements[Number(depNum)]) {
          allUpdateStatements[Number(depNum)] = []
        }
        allUpdateStatements[Number(depNum)].push(...statements)
      })
      allClassProperties.push(...classProperties)
      topLevelNodes.push(nodeName)
    })

    const viewBody = (
      this.t.blockStatement([
        ...allInitStatements,
        ...this.geneUpdate(allUpdateStatements),
        this.geneReturn(topLevelNodes)
      ])
    )

    return [viewBody, allClassProperties, this.templateIdx]
  }

  /**
   * this._$update = (changed) => {
   *  if (changed & 1) {
   *    ...
   *  }
   *  ...
   * }
   */
  private geneUpdate(updateStatements: Record<number, t.Statement[]>): t.Statement[] {
    if (Object.keys(updateStatements).length === 0) return []
    return [
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$update"),
            false
          ),
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed")],
            this.t.blockStatement([
              ...Object.entries(updateStatements)
                .filter(([depNum]) => depNum !== "0")
                .map(([depNum, statements]) => {
                  return (
                    this.t.ifStatement(
                      this.t.binaryExpression(
                        "&",
                        this.t.identifier("changed"),
                        this.t.numericLiteral(Number(depNum))
                      ),
                      this.t.blockStatement(statements)
                    )
                  )
                }),
              ...updateStatements[0] ?? []
            ])
          )
        )
      )
    ]
  }

  /**
   * return [${nodeNames}]
   */
  private geneReturn(topLevelNodes: string[]) {
    return (
      this.t.returnStatement(
        this.t.arrayExpression(
          topLevelNodes.map(nodeName => this.t.identifier(nodeName))
        )
      )
    )
  }
}
