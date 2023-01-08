import * as t from "@babel/types";
import * as BabelParser from "./babelParser"
import * as BabelNode from "./babelNode"
import * as NodeHelper from "./nodeHelper"
import {isMemberInFunction} from "./nodeHelper";


export function state(node: t.ClassProperty, classBodyNode: t.ClassBody) {
    const propertyName = (node.key as t.Identifier).name;
    (node.key as t.Identifier).name = `_$${propertyName}`
    const propertyIdx = classBodyNode.body.indexOf(node)
    const getterFuncNode = BabelParser.functionBlockStatement(`
    function ${propertyName}() {
        return this._$${propertyName}
    }`)
    const setterFuncNode = BabelParser.functionBlockStatement(`
    function ${propertyName}(value) {
        if (this._$${propertyName} === value) return
        this._$${propertyName} = value
        this._$runDeps("${propertyName}")
    }`)

    const [getterNode, setterNode] = BabelNode.createGetterSetter(
        propertyName,
        getterFuncNode.body,
        setterFuncNode.body
    )

    classBodyNode.body.splice(propertyIdx+1, 0, getterNode, setterNode)
}


export function effect(node: t.ClassProperty | t.ClassMethod, classBodyNode: t.ClassBody, effectFuncNode: t.ClassProperty, path: any, depArr: string[], decorator: t.Decorator, classDeclarationNode: t.ClassDeclaration) {
    let deps: string[] = []
    // ---- 如果decorator有参数，把参数也放到依赖里面
    if (t.isCallExpression(decorator.expression)) {
        deps.push(...decorator.expression.arguments.map((a:any)=>a.value).filter(a=>depArr.includes(a)))
    }
    path.scope.traverse(node, {
        MemberExpression(innerPath: any) {
            if (depArr.includes(innerPath.node.property.name)) {
                if (!isMemberInFunction(innerPath, classDeclarationNode)) {
                    deps.push(innerPath.node.property.name)
                }
            }
        }
    })
    deps = [...new Set(deps)]
    if (deps.length === 0) return
    NodeHelper.pushEffectFunc((node.key as t.Identifier).name, deps, effectFuncNode, classBodyNode)
}

