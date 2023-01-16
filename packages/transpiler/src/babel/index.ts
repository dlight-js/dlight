import * as BabelNode from "./babelNode"
import * as NodeHelper from "./nodeHelper"
import * as DecoratorResolver from "./decoratorResolver"
import {BodyParser} from "./bodyParser";
import {isMemberInFunction} from "./nodeHelper";
import * as BabelParser from "./babelParser"
// @ts-ignore
import babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import babelTraverse from "@babel/traverse"
import * as t from "@babel/types";
import {parseDLightBody} from "../parser";
import {resolveParserEl} from "../generator";

const parse = babel.parse
const generate = (ast: any) => babelGenerate.default(ast).code
const traverse = babelTraverse.default

const babelConfig = {
    filename: "*.ts",
    presets: ["@babel/preset-typescript"],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
}

function rebuildBody(str: string, derivedArr: string[]) {
    let parserEl = parseDLightBody(str)
    return resolveParserEl(parserEl, derivedArr)
}


export function go(code: string) {
    console.log("------body------")
    const bodyParser = new BodyParser(code)
    bodyParser.parse()
    const bodyMap = bodyParser.bodyMap

    console.log("------traverse------")
    const ast = parse(bodyParser.codeOut, babelConfig)

    let classDeclarationNode: t.ClassDeclaration | null = null
    let classBodyNode: t.ClassBody | null = null
    // ---- 在这里新建node很省时间
    let depsNode: t.ClassProperty | null = null
    let derivedNode: t.ClassProperty | null = null
    let derivedArr: string[] = []

    traverse(ast, {
        ClassDeclaration(path: any) {
            const node = path.node as t.ClassDeclaration
            // ---- 如果是继承View的，新建_$decorators, _$propDerivedPairs
            if(t.isIdentifier(node.superClass, {name: "View"})) {
                classDeclarationNode = node
                classBodyNode = classDeclarationNode.body
                derivedNode = t.classProperty(
                    t.identifier("_$derivedPairs"),
                    t.objectExpression([])
                )
                depsNode = t.classProperty(
                    t.identifier("_$deps"),
                    t.objectExpression([])
                )
                derivedArr = []
                return
            }
        },
        ClassProperty(path: any) {
            if (!classDeclarationNode) return
            const node = path.node as t.ClassProperty

            if (t.isIdentifier(node.key, {name: "Body"})) {
                // ---- body处理
                const bodyId = (node.value as any).value
                const newBody = rebuildBody(bodyMap[bodyId], derivedArr)
                console.log(newBody)
                node.value = t.arrowFunctionExpression([], BabelParser.functionBlockStatement(`
                    function tmp() {
                        ${newBody}
                    }
                `).body)
                return
            }

            // ---- 看是不是有属性是 prop derived，有就加一个()=>
            //      同时在propDerived中记录，这会在constructor的调用一遍
            let deps: string[] = []
            path.scope.traverse(node,{
                MemberExpression(innerPath: any) {
                    if (derivedArr.includes(innerPath.node.property.name)) {
                        if (!isMemberInFunction(innerPath, classDeclarationNode!)) {
                            deps.push(innerPath.node.property.name)
                        }
                    }
                }
            })
            deps = [...new Set(deps)]
            if (deps.length > 0) {
                NodeHelper.pushDerived((node.key as any).name, deps, derivedNode!, classBodyNode!)
                NodeHelper.pushDep((node.key as any).name, depsNode!, classBodyNode!)
                BabelNode.valueWithArrowFunc(node)
                derivedArr.push((node.key as any).name)
            }
            // ---- 如果有修饰器
            if (node.decorators) {
                for (let decorator of node.decorators) {
                    // ---- 直接收不带prop和带一层prop的decorator
                    //      如 @Derived  /  @Derived("1","2")
                    const decoratorName = (decorator.expression as t.Identifier).name ??
                        ((decorator.expression as t.CallExpression).callee as t.Identifier).name
                    if (["PropState", "State"].includes(decoratorName)) {
                        derivedArr.push((node.key as any).name)
                        NodeHelper.pushDep((node.key as any).name, depsNode!, classBodyNode!)
                        DecoratorResolver.state(node, classBodyNode!)
                        break
                    }
                    if (["Prop", "DotProp", "Environment"].includes(decoratorName)) {
                        derivedArr.push((node.key as any).name)
                        NodeHelper.pushDep((node.key as any).name, depsNode!, classBodyNode!)
                        DecoratorResolver.prop(node, classBodyNode!)
                        break
                    }

                }
                node.decorators = null
            }


        },
    });
    console.log("------code------")
    const returnedCode = generate(ast)
    const newCode = "import * as _$ from '@/core'\n" + returnedCode
    console.log(newCode)
    return newCode
}