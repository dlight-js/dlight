import {functionBlockStatement, pushDep, pushDerived, shouldBeListened, valueWithArrowFunc} from './nodeHelper';
import * as t from "@babel/types";
import { resolveParserNode } from "../generator";
import Transpiler from "./babelTranspiler"
import parseJsdBody from "../parser/jsdParser";
import parseJsxBody from "../parser/jsxParser";
import {resolveProp, resolveState} from "./decoratorResolver";


function handleJsdBody(node: t.ClassMethod, depChain: string[], subViews: string[]) {
    const newBody = resolveParserNode(parseJsdBody(node.body.body), depChain, subViews)
    node.body = functionBlockStatement(`function tmp() { ${newBody} }`)
}
function handleJsxBody(node: t.ClassProperty, depChain: string[], subViews: string[]) {
    const newBody = resolveParserNode(parseJsxBody(node.value as any), depChain, subViews)
    node.value = t.arrowFunctionExpression([], functionBlockStatement(`function tmp() { ${newBody} }`))
}

function handleBody(classBodyNode: t.ClassBody, depChain: string[], type: "jsx" | "jsd") {
    const handleBodyFunc = type === "jsd" ? handleJsdBody : handleJsxBody
    let body: undefined | t.Node = undefined
    const views = []
    for (let c of classBodyNode.body) {
        if ((c as any).decorators?.find((d: any) =>
            t.isIdentifier(d.expression) && d.expression.name === "View"
        )) {
            (c as any).decorators = undefined
            views.push(c)
        } else if ((c as any).key.name === "Body") {
            body = c
        }
    }
    const subViews = views.map(v => "this." + (v as any).key.name)
    for (let view of views) {
        handleBodyFunc(view as any, depChain, subViews)
    }
    handleBodyFunc(body as any, depChain, subViews)

}

export function parseDlightFile(sourceFileCode: string, type: "jsx" | "jsd") {
    const ast = Transpiler.parse(sourceFileCode)

    let classDeclarationNode: t.ClassDeclaration | null = null
    let classBodyNode: t.ClassBody | null = null
    // ---- 在这里新建node很省时间
    let depsNode: t.ClassProperty | null = null
    let derivedNode: t.ClassProperty | null = null
    let depChain: string[] = []

    Transpiler.traverse(ast, {
        ClassDeclaration(path: any) {
            const node = path.node as t.ClassDeclaration
            // ---- 如果是继承View的，新建_$decorators, _$propDerivedPairs
            if(t.isIdentifier(node.superClass!, {name: "View"})) {
                classDeclarationNode = node
                classBodyNode = classDeclarationNode.body
                classBodyNode.body.unshift(
                    t.classProperty(
                        t.identifier("_$tag"),
                        t.stringLiteral(classDeclarationNode.id.name)
                    )
                )
                derivedNode = t.classProperty(
                    t.identifier("_$derivedPairs"),
                    t.objectExpression([])
                )
                depsNode = t.classProperty(
                    t.identifier("_$deps"),
                    t.objectExpression([])
                )
                depChain = []
                return
            }
        },
        ClassMethod(path: any) {
            if (!classDeclarationNode) return
            if (classBodyNode!.body.indexOf(path.node) === classBodyNode!.body.length - 1) {
                handleBody(classBodyNode!, depChain, type)
            }
        },
        ClassProperty(path: any) {
            if (!classDeclarationNode) return
            const node = path.node as t.ClassProperty
            // ---- 要提前判断是不是最后一个，因为后面会赠加
            const willParseBody = classBodyNode!.body.indexOf(path.node) === classBodyNode!.body.length - 1
            // ---- 如果是view，直接return
            if (node.decorators?.find(d => t.isIdentifier(d.expression) && d.expression.name === "View")
            || (node.key as t.Identifier).name === "Body") {
                if (willParseBody) handleBody(classBodyNode!, depChain, type)
                return
            }

            // ---- 看是不是有属性是 prop derived，有就加一个()=>
            //      同时在propDerived中记录，这会在constructor的调用一遍
            let deps: string[] = []
            path.scope.traverse(node,{
                MemberExpression(innerPath: any) {
                    if (depChain.includes(innerPath.node.property.name)) {
                        if (shouldBeListened(innerPath, classDeclarationNode!)) {
                            deps.push(innerPath.node.property.name)
                        }
                    }
                }
            })
            deps = [...new Set(deps)]
            if (deps.length > 0) {
                pushDerived((node.key as any).name, deps, derivedNode!, classBodyNode!)
                pushDep((node.key as any).name, depsNode!, classBodyNode!)
                valueWithArrowFunc(node)
                depChain.push((node.key as any).name)
            }
            // ---- 如果有修饰器
            if (node.decorators) {
                for (let decorator of node.decorators) {
                    const decoratorName = (decorator.expression as t.Identifier).name ??
                        ((decorator.expression as t.CallExpression).callee as t.Identifier).name
                    if (["EnvState", "PropState", "State"].includes(decoratorName)) {
                        depChain.push((node.key as any).name)
                        pushDep((node.key as any).name, depsNode!, classBodyNode!)
                        resolveState(node, classBodyNode!)
                        break
                    }
                    if (["Prop", "Env"].includes(decoratorName)) {
                        depChain.push((node.key as any).name)
                        pushDep((node.key as any).name, depsNode!, classBodyNode!)
                        resolveProp(node, classBodyNode!, decoratorName as any)
                        break
                    }

                }
                node.decorators = null
            }

            // ---- 最后处理body
            if (willParseBody) {
                handleBody(classBodyNode!, depChain, type)
            }
        },
    });

    const returnedCode = Transpiler.generate(ast)
    const newCode = "import * as _$ from '@dlightjs/dlight';\n" + returnedCode

    return newCode
}