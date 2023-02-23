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


export function resolveAwait(node: t.ClassProperty) {
    let defaultValue: any
    let value: any
    if (t.isLogicalExpression(node.value) && node.value.operator === "??") {
        value = node.value.left
        defaultValue = node.value.right
    } else {
        value = node.value
        defaultValue = t.identifier("undefined")
    }

    node.value = t.callExpression(
        t.memberExpression(
            t.functionExpression(null, [], t.blockStatement(
                [t.expressionStatement(t.callExpression(
                    t.memberExpression(value, t.identifier("then")),
                    [t.arrowFunctionExpression([t.identifier("_$data")], t.blockStatement([t.expressionStatement(t.assignmentExpression(
                        "=", t.memberExpression(t.thisExpression(), t.identifier((node.key as any).name)), t.identifier("_$data")
                    ))]))]
                )),
                t.returnStatement(defaultValue)]
            )),
            t.identifier("call")
        ),
        [t.thisExpression()]
    )
}