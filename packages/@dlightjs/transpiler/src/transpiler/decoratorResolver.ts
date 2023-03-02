import * as t from "@babel/types";
import {createGetterSetter, functionBlockStatement} from "./nodeHelper";
import Transpiler from "./babelTranspiler";


export function resolveState(node: t.ClassProperty, classBodyNode: t.ClassBody, customDecoratorNames: string[]) {
    const propertyName = (node.key as t.Identifier).name;
    (node.key as t.Identifier).name = `_$$${propertyName}`
    const propertyIdx = classBodyNode.body.indexOf(node)

    const customDecoratorsPreset = customDecoratorNames
        .map(s => `if (${s}.preset) value = ${s}.preset(value, d=>this.${propertyName}=d)`)
        .join("\n")

    const getterFuncNode = functionBlockStatement(`
    function ${propertyName}() {
        return this._$$${propertyName}
    }`)
    const setterFuncNode = functionBlockStatement(`
    function ${propertyName}(value) {
        ${customDecoratorsPreset}
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


export function resolveCustom(node: t.ClassProperty, decoratorName: string, classBodyNode: t.ClassBody) {
    const propertyName = (node.key as t.Identifier).name
    const value = Transpiler.generate(node.value ?? t.identifier("undefined"))

    if (!/^[0-9a-zA-z$_]+$/.test(decoratorName)) {
        const propertyIdx = classBodyNode.body.indexOf(node)
        // ---- Watch(() => {doSomething()} => Watch
        const trimmedName = decoratorName.match(/^[0-9a-zA-z$_]+/)![0]

        classBodyNode.body.splice(propertyIdx, 0, t.classProperty(
            t.identifier(`_$$${propertyName}_${trimmedName}`),
            Transpiler.parse(decoratorName).program.body[0].expression
        ))
        decoratorName = `this._$$${propertyName}_${trimmedName}`
    }


    node.value = Transpiler.parse("" +
        `(${decoratorName}.func??(typeof ${decoratorName} === "function" ? ${decoratorName} : (_=>_)))`+
        `(${value}, (_)=>this.${propertyName}=_, this.${propertyName})`
    ).program.body[0].expression

    return decoratorName
}