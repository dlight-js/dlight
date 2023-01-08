import * as t from "@babel/types";

export function pushDep(name: string, depsStore: t.ClassProperty, classBodyNode: t.ClassBody) {
    if (!classBodyNode.body.includes(depsStore)) {
        classBodyNode.body.unshift(depsStore)
    }
    (depsStore as any).value.properties.push({
        type: "ObjectProperty",
        key: {
            type: "Identifier",
            name
        } as t.Identifier,
        computed: false,
        shorthand: false,
        value: {
            type: "ObjectExpression",
            properties: []
        } as t.ObjectExpression
    })
}

export function pushPropDerived(name: string, deps: string[], propDerivedNode: t.ClassProperty, classBodyNode: t.ClassBody) {
    if (!classBodyNode.body.includes(propDerivedNode)) {
        classBodyNode.body.unshift(propDerivedNode)
    }
    (propDerivedNode as any).value.properties.push(
        t.objectProperty(
            t.identifier(name),
            t.arrayExpression(deps.map(dep => t.stringLiteral(dep)))
        )
    )
}

export function pushStateDerived(name: string, deps: string[], stateDerivedNode: t.ClassProperty, classBodyNode: t.ClassBody) {
    if (!classBodyNode.body.includes(stateDerivedNode)) {
        classBodyNode.body.unshift(stateDerivedNode)
    }
    (stateDerivedNode as any).value.properties.push(
        t.objectProperty(
            t.identifier(name),
            t.arrayExpression(deps.map(dep => t.stringLiteral(dep)))
        )
    )
}

export function pushEffectFunc(name: string, deps: string[], effectFuncNode: t.ClassProperty, classBodyNode: t.ClassBody) {
    if (!classBodyNode.body.includes(effectFuncNode)) {
        classBodyNode.body.unshift(effectFuncNode)
    }
    (effectFuncNode as any).value.properties.push({
        type: "ObjectProperty",
        key: {
            type: "Identifier",
            name: name
        } as t.Identifier,
        value: {
            type: "ArrayExpression",
            elements: deps.map(dep => ({
                type: "StringLiteral",
                value: dep
            } as t.StringLiteral))
        } as t.ArrayExpression
    } as t.ObjectProperty)
}

export function isMemberInFunction(innerPath: any, classDeclarationNode?: t.Node) {
    // ---- 一直找到classDeclaration，
    //      如果这个 this.xxx前面有function或者arrowFunction包裹，直接不管
    let isInFunction = false
    let reversePath = innerPath.parentPath
    while (reversePath && reversePath.node !== classDeclarationNode) {
        if (t.isFunctionExpression(reversePath.node) ||
            t.isArrowFunctionExpression(reversePath.node)) {
            isInFunction = true
            break
        }
        reversePath = reversePath.parentPath
    }

    return isInFunction
}