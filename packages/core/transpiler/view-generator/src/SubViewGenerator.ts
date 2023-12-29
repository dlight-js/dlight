import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import ViewGenerator from "./ViewGenerator"

export default class SubViewGenerator extends ViewGenerator {
  /**
   * @brief Generate the subview, i.e., @View MySubView({ prop1, prop2 }) { ... }
   *  This is different from the main view in that it has a props node
   *  and is needed to parse twice,
   *    1. for this.deps (viewParticlesWithPropertyDep)
   *    2. for props that passed in this subview (viewParticlesWithIdentityDep)
   * @param viewParticlesWithPropertyDep
   * @param viewParticlesWithIdentityDep
   * @param propsNode
   * @returns [viewBody, classProperties, templateIdx]
   */
  generate(
    viewParticlesWithPropertyDep: ViewParticle[],
    viewParticlesWithIdentityDep: ViewParticle[],
    propsNode: t.ObjectPattern
  ): [t.BlockStatement, t.ClassProperty[], number] {
    const allClassProperties: t.ClassProperty[] = []
    const allInitStatements: t.Statement[] = []
    const propertyUpdateStatements: Record<number, t.Statement[]> = {}
    const identifierUpdateStatements: Record<number, t.Statement[]> = {}
    const topLevelNodes: string[] = []

    const templateIdx = this.templateIdx
    viewParticlesWithPropertyDep.forEach(viewParticle => {
      const [initStatements, updateStatements, classProperties, nodeName] =
        this.generateChild(viewParticle)
      allInitStatements.push(...initStatements)
      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!propertyUpdateStatements[Number(depNum)]) {
          propertyUpdateStatements[Number(depNum)] = []
        }
        propertyUpdateStatements[Number(depNum)].push(...statements)
      })
      allClassProperties.push(...classProperties)
      topLevelNodes.push(nodeName)
    })
    // ---- Recover the templateIdx and reinitialize the nodeIdx
    this.templateIdx = templateIdx
    this.nodeIdx = -1
    viewParticlesWithIdentityDep.forEach(viewParticle => {
      // ---- We only need the update statements for the second props parsing
      //      because all the init statements are already generated
      //      a little bit time consuming but otherwise we need to write two different generators
      const [, updateStatements] = this.generateChild(viewParticle)

      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!identifierUpdateStatements[Number(depNum)]) {
          identifierUpdateStatements[Number(depNum)] = []
        }
        identifierUpdateStatements[Number(depNum)].push(...statements)
      })
    })

    const hasPropertyUpdateFunc =
      Object.keys(propertyUpdateStatements).length > 0
    const hasIdentifierUpdateFunc =
      Object.keys(identifierUpdateStatements).filter(n => n !== "0").length > 0

    const viewBody = this.t.blockStatement([
      this.declareNodes(),
      ...(hasPropertyUpdateFunc
        ? [this.geneUpdateFunc("update", propertyUpdateStatements)]
        : []),
      ...(hasIdentifierUpdateFunc
        ? [
            this.geneUpdateFunc(
              "updateProp",
              identifierUpdateStatements,
              propsNode
            ),
          ]
        : []),
      ...allInitStatements,
      this.geneAddNodes(topLevelNodes),
    ])

    return [viewBody, allClassProperties, this.templateIdx]
  }

  /**
   * @View
   * $subviewNode._$nodes = ${topLevelNodes}
   */
  geneAddNodes(topLevelNodes: string[]): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier("$subviewNode"),
          this.t.identifier("_$nodes")
        ),
        this.t.arrayExpression(
          topLevelNodes.map(nodeName => this.t.identifier(nodeName))
        )
      )
    )
  }

  /**
   * @View
   * $subviewNode.${name} = (changed) => { ${updateStatements} }
   */
  geneUpdateFunc(
    name: string,
    updateStatements: Record<number, t.Statement[]>,
    propsNode?: t.ObjectPattern
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier("$subviewNode"),
          this.t.identifier(name)
        ),
        this.geneUpdateBody(updateStatements, propsNode)
      )
    )
  }

  /**
   * @View
   * (changed) => {
   *  if (changed & 1) {
   *    ...
   *  }
   *  ...
   * }
   */
  private geneUpdateBody(
    updateStatements: Record<number, t.Statement[]>,
    propsNode?: t.ObjectPattern
  ): t.ArrowFunctionExpression {
    // ---- Args
    const args: t.Identifier[] = [this.t.identifier("changed")]
    if (propsNode) {
      args.push(this.t.identifier("$subviewProps"))
    }

    // ---- If update
    if (propsNode) {
      /**
       * ${prop} = $subviewProps
       */
      propsNode.properties
        .filter(prop => this.t.isObjectProperty(prop))
        .forEach((prop, idx) => {
          const depNum = 1 << idx
          if (!updateStatements[depNum]) updateStatements[depNum] = []
          updateStatements[depNum].unshift(
            this.t.expressionStatement(
              this.t.assignmentExpression(
                "=",
                this.t.objectPattern([prop]),
                this.t.identifier("$subviewProps")
              )
            )
          )
        })
    }
    // ---- End
    const runAllStatements = propsNode ? [] : updateStatements[0] ?? []

    return this.t.arrowFunctionExpression(
      args,
      this.t.blockStatement([
        ...Object.entries(updateStatements)
          .filter(([depNum]) => depNum !== "0")
          .map(([depNum, statements]) => {
            return this.t.ifStatement(
              this.t.binaryExpression(
                "&",
                this.t.identifier("changed"),
                this.t.numericLiteral(Number(depNum))
              ),
              this.t.blockStatement(statements)
            )
          }),
        ...runAllStatements,
      ])
    )
  }
}
