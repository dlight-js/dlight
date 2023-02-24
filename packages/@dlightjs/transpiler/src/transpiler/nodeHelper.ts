import * as t from "@babel/types";
import Transpiler from "./babelTranspiler";


export function pushDerived(name: string, deps: string[], propDerivedNode: t.ClassProperty, classBodyNode: t.ClassBody) {
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

export function pushDep(name: string, depsNode: t.ClassProperty, classBodyNode: t.ClassBody) {
    if (!classBodyNode.body.includes(depsNode)) {
        classBodyNode.body.unshift(depsNode)
    }
    if ((depsNode as any).value.properties.map((p:any) => p.key.name).includes(name)) return
    (depsNode as any).value.properties.push(
        t.objectProperty(
            t.identifier(name),
            t.newExpression(t.identifier("Map"),[])
        )
    )
}


export function isMemberInFunction(innerPath: any, classDeclarationNode?: t.Node) {
    // ---- 一直找到classDeclaration，
    //      如果这个 this.xxx前面有function或者arrowFunction包裹，直接不管
    // ---- 对于上面的描述，改一下，如果有arrowFunction就不考虑，如果是function
    //      默认为这种情况：
    //      a = function() {/* do something */} ()
    //      因为如果普通function，你改写成method而非member
    let isInFunction = false
    let reversePath = innerPath.parentPath
    while (reversePath && reversePath.node !== classDeclarationNode) {
        if (t.isArrowFunctionExpression(reversePath.node)) {
            isInFunction = true
            break
        }
        reversePath = reversePath.parentPath
    }

    return isInFunction
}

export function isAssignmentExpressionLeft(innerPath: any) {
    // ---- 判断是不是 this.count = 1 的情况
    const parentNode = innerPath.parentPath.node
    return t.isAssignmentExpression(parentNode) && parentNode.left === innerPath.node
}

export function isAssignmentExpressionRight(innerPath: any, classDeclarationNode?: t.Node) {
    // ---- 判断是不是 this.count = this.count + 1 的情况
    //      因为有可能无限嵌套 this.count = function(){return this.count}.call(this) 这种情况所以
    const currNode = innerPath.node
    let isRightExp = false
    let reversePath = innerPath.parentPath
    while (reversePath && reversePath.node !== classDeclarationNode) {
        if (t.isAssignmentExpression(reversePath.node)) {
            const leftNode = reversePath.node.left
            const typeEqual = currNode.type === leftNode.type
            const identifierEqual = currNode.property.name === leftNode.property.name
            isRightExp = typeEqual && identifierEqual
        }
        reversePath = reversePath.parentPath
    }

    return isRightExp
}

export function shouldBeListened(innerPath: any, classDeclarationNode?: t.Node) {
    return (!isMemberInFunction(innerPath, classDeclarationNode) &&
            !isAssignmentExpressionLeft(innerPath) &&
            !isAssignmentExpressionRight(innerPath, classDeclarationNode))
}



export function functionBlockStatement(code: string) {
    return (Transpiler.parse(code).program.body[0] as t.FunctionDeclaration).body
}

export function createGetterSetter(
    name: string,
    getterBody: t.BlockStatement,
    setterBody: t.BlockStatement
) {

    return [
        t.classMethod("get", t.identifier(name), [], getterBody),
        t.classMethod("set", t.identifier(name), [t.identifier("value")], setterBody)
    ]
}

export function valueWithArrowFunc(node: any) {
    const originValue = node.value
    node.value = {
        type: "ArrowFunctionExpression",
        params: [],
        body: originValue as any
    } as any
}


export function getDecoName(decorator: t.Decorator) {
    return Transpiler.generate(decorator.expression)
}

export function getDecoNode(decoratorName: string) {
    return Transpiler.parse(decoratorName).program.body[0].expression
}