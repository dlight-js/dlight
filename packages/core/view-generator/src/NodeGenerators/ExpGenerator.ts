import { type types as t } from "@babel/core"
import { type ExpParticle } from "@dlightjs/reactivity-parser"
import ElementGenerator from "../HelperGenerators/ElementGenerator"
import { DLError } from "../error"

export default class ExpGenerator extends ElementGenerator {
  run() {
    const { content, props } = this.viewParticle as ExpParticle

    const dlNodeName = this.generateNodeName()
    this.addInitStatement(this.declareExpNode(dlNodeName, content.value))

    if (content.dependencyIndexArr && content.dependencyIndexArr.length > 0) {
      this.addUpdateStatements(content.dependencyIndexArr, [this.updateExpNode(dlNodeName)])
    }

    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        const statement = this.setExpProp(dlNodeName, key, value)
        if (statement) {
          this.addInitStatement(statement)
          dependencyIndexArr = [...dependencyIndexArr ?? [], ...content.dependencyIndexArr ?? []]
          if (dependencyIndexArr.length > 0) {
            this.addUpdateStatements(dependencyIndexArr, [statement])
          }
        }
      })
    }

    return dlNodeName
  }

  private setExpProp(dlNodeName: string, key: string, value: t.Expression) {
    if (key === "element") return this.setElement(dlNodeName, value, true)
    if (key === "do") return this.addDo(dlNodeName, value)

    DLError.warn1()
  }

  /**
   * const ${dlNodeName} = new ExpNode(() => ${value})
   */
  private declareExpNode(dlNodeName: string, value: t.Expression) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(this.importMap.ExpNode),
            [
              this.t.arrowFunctionExpression([], value)
            ]
          )
        )
      ])
    )
  }

  /**
   * ${dlNodeName}.update()
   */
  private updateExpNode(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("update")
          ),
          []
        )
      )
    )
  }
}
