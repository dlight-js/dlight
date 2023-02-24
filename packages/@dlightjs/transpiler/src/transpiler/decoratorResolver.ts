import * as t from "@babel/types";
import {createGetterSetter, functionBlockStatement} from "./nodeHelper";


export function resolveState(node: t.ClassProperty, classBodyNode: t.ClassBody) {
    const propertyName = (node.key as t.Identifier).name;
    (node.key as t.Identifier).name = `_$$${propertyName}`
    const propertyIdx = classBodyNode.body.indexOf(node)
    const getterFuncNode = functionBlockStatement(`
    function ${propertyName}() {
        return this._$$${propertyName}
    }`)
    const setterFuncNode = functionBlockStatement(`
    function ${propertyName}(value) {
        if (this._$$${propertyName} === value) return
        this._$$${propertyName} = value
        this._$runDeps("${propertyName}")
    }`)

    const [getterNode, setterNode] = createGetterSetter(
        propertyName,
        getterFuncNode,
        setterFuncNode
    )

    classBodyNode.body.splice(propertyIdx+1, 0, getterNode, setterNode)
}

export function resolveProp(node: t.ClassProperty, classBodyNode: t.ClassBody, decoratorName: "Prop" | "Env") {
    const propertyName = (node.key as t.Identifier).name;
    const propertyIdx = classBodyNode.body.indexOf(node)
    let tag: string = decoratorName.toLowerCase()
    const derivedStatusKey = t.classProperty(
        t.identifier(`_$$${propertyName}`),
        t.stringLiteral(`_$${tag}`)
    )
    classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)

}


export function resolveCustom(node: t.ClassProperty, decoratorNode: any) {
    let value = node.value

    node.value = t.callExpression(
        decoratorNode,
        [value ?? t.identifier("undefined"), t.arrowFunctionExpression(
            [t.identifier("$_newMember")],
            t.assignmentExpression(
                "=",
                t.memberExpression(t.thisExpression(), t.identifier((node.key as any).name)),
                t.identifier("$_newMember"))
        )]
    )
}