import * as t from "@babel/types";
import * as BabelParser from "./babelParser"
import * as BabelNode from "./babelNode"


export function state(node: t.ClassProperty, classBodyNode: t.ClassBody) {
    const propertyName = (node.key as t.Identifier).name;
    (node.key as t.Identifier).name = `_$$${propertyName}`
    const propertyIdx = classBodyNode.body.indexOf(node)
    const getterFuncNode = BabelParser.functionBlockStatement(`
    function ${propertyName}() {
        return this._$$${propertyName}
    }`)
    const setterFuncNode = BabelParser.functionBlockStatement(`
    function ${propertyName}(value) {
        if (this._$$${propertyName} === value) return
        this._$$${propertyName} = value
        this._$runDeps("${propertyName}")
    }`)

    const [getterNode, setterNode] = BabelNode.createGetterSetter(
        propertyName,
        getterFuncNode.body,
        setterFuncNode.body
    )

    classBodyNode.body.splice(propertyIdx+1, 0, getterNode, setterNode)
}

export function prop(node: t.ClassProperty, classBodyNode: t.ClassBody, decoratorName: "Prop" | "Env") {
    const propertyName = (node.key as t.Identifier).name;
    const propertyIdx = classBodyNode.body.indexOf(node)
    let tag: string = decoratorName.toLowerCase()
    const derivedStatusKey = t.classProperty(
        t.identifier(`_$$${propertyName}`),
        t.stringLiteral(`_$${tag}`)
    )
    classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)

}
