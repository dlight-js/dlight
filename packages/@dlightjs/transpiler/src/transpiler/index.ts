import {
    functionBlockStatement,
    getDecoName,
    pushDep,
    pushDerived,
    shouldBeListened,
    valueWithArrowFunc
} from './nodeHelper'
import * as t from "@babel/types";
import { resolveParserNode } from "../generator";
import Transpiler from "./babelTranspiler"
import parseJsdBody from "../parser/jsdParser";
import parseJsxBody from "../parser/jsxParser";
import { resolveCustom, resolveProp, resolveState } from './decoratorResolver'


function handleJsdBody(node: t.ClassMethod, depChain: string[], subViews: string[], isSubView=false) {
    let newBody

    if (isSubView) {
        const param = node.params[0]
        if (!param || !t.isObjectPattern(param)) {
            newBody = resolveParserNode(parseJsdBody(node.body.body), depChain, subViews)
        } else {
            const propNames: string[] = param.properties.map((p: any) => p.key.name)
            const idDepsArr = propNames.map(propName => ({ids: [propName], propNames: [`...${propName}.deps`]}))
            newBody = resolveParserNode(parseJsdBody(node.body.body), depChain, subViews, idDepsArr)
        }
    } else {
        newBody = resolveParserNode(parseJsdBody(node.body.body), depChain, subViews)
    }
    node.body = functionBlockStatement(`function tmp() { ${newBody} }`)
}
function handleJsxBody(node: t.ClassProperty, depChain: string[], subViews: string[]) {
    const newBody = resolveParserNode(parseJsxBody(node.value as any), depChain, subViews)
    node.value = t.arrowFunctionExpression([], functionBlockStatement(`function tmp() { ${newBody} }`))
}

function handleSubView(view: t.ClassMethod) {
    const param = view.params[0]
    if (!param || !t.isObjectPattern(param)) return
    const props: string[] = []
    for (let property of param.properties) {
        const name = (property as any).key.name
        props.push(name)
        // ---- 如果是 {a=1} 这种有赋值的情况
        if (t.isAssignmentPattern((property as any).value)) {
            (property as any).value.right = t.objectExpression(
                [t.objectProperty(
                    t.identifier("value"),
                    (property as any).value.right
                ),
                t.objectProperty(
                    t.identifier("deps"),
                    t.arrayExpression()
                )]
            )
        }
    }
    // ---- 遍历拿到所有item里面的标识符，下面要把标识符转换成带.value的
    //      注意这里转换，view.body是blockStatement，自带括号
    const ast = Transpiler.parse(`function tmp() ${Transpiler.generate(view.body)}`)
    Transpiler.traverse(ast, {
        Identifier(path: any) {
            if (props.includes(path.node.name) &&
                !t.isMemberExpression(path.parentPath.node)) {
                path.replaceWith(t.memberExpression(
                    t.identifier(path.node.name),
                    t.identifier("value")
                ))
                path.skip()
            }
        }
    })
    view.body = ast.program.body[0].body
}

function handleBody(classBodyNode: t.ClassBody, depChain: string[], type: "jsx" | "jsd") {
    const handleBodyFunc = type === "jsd" ? handleJsdBody : handleJsxBody
    let body: undefined | t.Node = undefined
    const views: any[] = []
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
        handleBodyFunc(view as any, depChain, subViews, true)
        handleSubView(view)
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

            // ---- decorator有自定义的，直接改哦
            const internalDecoratorNames = ["EnvState", "PropState", "State", "Prop", "Env"]
            const customDecoratorNames: string[] = []
            const decoratorNames: string[] = (node.decorators ?? []).map((deco): any => {
                const decoName = getDecoName(deco)
                if (internalDecoratorNames.includes(decoName)) return decoName
                customDecoratorNames.push(resolveCustom(node, decoName, classBodyNode!))

            }).filter(n => n)

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
            for (let decoratorName of decoratorNames) {
                if (["EnvState", "PropState", "State"].includes(decoratorName)) {
                    depChain.push((node.key as any).name)
                    pushDep((node.key as any).name, depsNode!, classBodyNode!)
                    resolveState(node, classBodyNode!, customDecoratorNames)
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