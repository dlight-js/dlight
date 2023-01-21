import * as t from "@babel/types";


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