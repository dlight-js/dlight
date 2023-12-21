import { type types as t } from "@babel/core"
import { type ViewParticle } from "@dlightjs/reactivity-parser"
import ViewGenerator from "./ViewGenerator"

export default class SubViewGenerator extends ViewGenerator {
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
      const [initStatements, updateStatements, classProperties, nodeName] = this.generateChild(viewParticle)
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
    this.templateIdx = templateIdx
    this.nodeIdx = -1
    viewParticlesWithIdentityDep.forEach(viewParticle => {
      const [, updateStatements] = this.generateChild(viewParticle)

      Object.entries(updateStatements).forEach(([depNum, statements]) => {
        if (!identifierUpdateStatements[Number(depNum)]) {
          identifierUpdateStatements[Number(depNum)] = []
        }
        identifierUpdateStatements[Number(depNum)].push(...statements)
      })
    })

    const viewBody = (
      this.t.blockStatement([
        ...allInitStatements,
        this.geneReturn(topLevelNodes, propertyUpdateStatements, identifierUpdateStatements, propsNode)
      ])
    )

    return [viewBody, allClassProperties, this.templateIdx]
  }

  /**
   * (changed) => {
   *  if (changed & 1) {
   *    ...
   *  }
   *  ...
   * }
   */
  private geneUpdateBody(updateStatements: Record<number, t.Statement[]>, propsNode?: t.ObjectPattern): t.ArrowFunctionExpression {
    // ---- Args
    const args: t.Identifier[] = [this.t.identifier("changed")]
    if (propsNode) {
      args.push(this.t.identifier("$subviewProps"))
    }
    // ---- If update
    if (propsNode) {
      const props = propsNode.properties
        .filter(prop => this.t.isObjectProperty(prop))
      /**
       * ${prop} = $subviewProps
       */
      Object.entries(updateStatements).forEach(([key, statements]) => {
        const depNum = Number(key)
        props.forEach((prop, idx) => {
          if (depNum & (1 << idx)) {
            statements.unshift(
              this.t.expressionStatement(
                this.t.assignmentExpression(
                  "=", this.t.objectPattern([prop]), this.t.identifier("$subviewProps")
                )
              )
            )
          }
        })
      })
    }
    // ---- End
    const runAllStatements = propsNode ? [] : updateStatements[0] ?? []
    // console.log(propsNode, )
    return (
      this.t.arrowFunctionExpression(
        args,
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
          ...runAllStatements
        ])
      )
    )
  }

  /**
   * return {
   *  _$dlNodeType: 5,
   *  update: ${this.geneUpdateBody(propertyUpdateStatements)},
   *  updateProp: ${this.geneUpdateBody(identifierUpdateStatements)},
   *  nodes: [${topLevelNodes}]
   * }
   */
  private geneReturn(
    topLevelNodes: string[],
    propertyUpdateStatements: Record<number, t.Statement[]>,
    identifierUpdateStatements: Record<number, t.Statement[]>,
    propsNode: t.ObjectPattern
  ) {
    const propertyUpdate = Object.keys(propertyUpdateStatements).length > 0
      ? [this.t.objectProperty(
          this.t.identifier("update"),
          this.geneUpdateBody(propertyUpdateStatements)
        )]
      : []

    const identifierUpdate = Object.keys(identifierUpdateStatements).filter(n => n !== "0").length > 0
      ? [this.t.objectProperty(
          this.t.identifier("updateProp"),
          this.geneUpdateBody(identifierUpdateStatements, propsNode)
        )]
      : []

    return (
      this.t.returnStatement(
        this.t.objectExpression([
          this.t.objectProperty(
            this.t.identifier("_$dlNodeType"),
            this.t.numericLiteral(5)
          ),
          ...propertyUpdate,
          ...identifierUpdate,
          this.t.objectProperty(
            this.t.identifier("_$nodes"),
            this.t.arrayExpression(
              topLevelNodes.map(nodeName => this.t.identifier(nodeName))
            )
          )
        ])
      )
    )
  }
}
