import { ParserNode } from "../ParserNode";
// @ts-ignore
import * as babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import traverse from "@babel/traverse"
import * as t from "@babel/types";
import { uid } from "../generator/utils";


const babelConfig = {
    presets: ["@babel/preset-react"],
}
const parse = (code: string) => babel.parse(code, babelConfig)
const generate = (ast: any) => babelGenerate(ast).code


class Parser {
    parserNode: ParserNode = new ParserNode("")
    jsxElement: t.JSXElement | t.JSXText | t.JSXExpressionContainer | t.JSXFragment

    constructor(jsxElement: t.JSXElement | t.JSXText | t.JSXExpressionContainer | t.JSXFragment | any) {
        this.jsxElement = jsxElement
    }

    resolveEl(jsxElement: t.JSXElement) {
        const tag = (jsxElement.openingElement.name as t.JSXIdentifier).name
        const newNode = new ParserNode(tag)
        for (let attribute of jsxElement.openingElement.attributes) {
            attribute = attribute as t.JSXAttribute
            const key = attribute.name.name
            const value = attribute.value
            const prop = t.isJSXExpressionContainer(value!) ?
                this.parseProp(key as string, value.expression) :
                {key, value: generate(value), nodes: {}}
            newNode.kv.props.push(prop)
        }
    
        for (let child of jsxElement.children) {
            const parser = new Parser(child as any)
            parser.parse()
            newNode.addChildren(parser.parserNode.children)
        }

        this.parserNode.addChild(newNode)
    }

    resolveFragment(jsxElement: t.JSXFragment) {
        for (let child of jsxElement.children) {
            this.resolveJSXElement(child as any)
        }
    }

    resolveText(jsxElement: t.JSXText) {
        const newNode = new ParserNode("text")
        const value = jsxElement.value.trim()
        // ---- 空的就不要了
        if (value === "") return
        newNode.kv.strSymbol = "`"
        newNode.kv.value = value

        this.parserNode.addChild(newNode)
    }

    parseProp(key: string, expression: t.Expression | t.JSXEmptyExpression) {
        const newAst = parse(generate(expression))
        const prop: any = {key, nodes: {}}

        traverse(newAst, {
            JSXElement(path: any) {
                const id = uid()
                const newParser = new Parser(path.node)
                newParser.parse()
                prop.nodes[id] = newParser.parserNode
                path.replaceWith(t.stringLiteral(id))
            }
        })

        let value = generate(newAst).trim().replace(/;$/g, " ")
        if (value.trim() === "") {
            value = "\"\""
        }
        prop.value = value
        return prop
    }
    resolveFor(jsxElement: t.JSXElement) {
        const newNode = new ParserNode("For")
        const forValueAttribute = jsxElement.openingElement.attributes
            .filter(a=> (a as t.JSXAttribute).name.name === "expression")[0]
        let forValue = ""
        if (forValueAttribute !== undefined) {
            const value = (forValueAttribute as t.JSXAttribute).value
            forValue = t.isJSXExpressionContainer(value!)
                ? generate(value.expression)
                : generate(value).replace(/(^["'`])|(["'`]$)/g, "")
        }
        newNode.kv.forValue = forValue

        const keyValueAttribute = jsxElement.openingElement.attributes
            .filter(a=> (a as t.JSXAttribute).name.name === "key")[0]
        if (keyValueAttribute !== undefined) {
            const value = (keyValueAttribute as t.JSXAttribute).value
            newNode.kv.key = t.isJSXExpressionContainer(value!)
                ? generate(value.expression)
                : generate(value).replace(/(^["'`])|(["'`]$)/g, "")
        }

        for (let child of jsxElement.children) {
            const parser = new Parser(child as any)
            parser.parse()
            newNode.addChildren(parser.parserNode.children)
        }

        this.parserNode.addChild(newNode)
    }

    resolveIf(jsxElement: t.JSXElement) {
        const newNode = new ParserNode("If")

        // ---- condition
        const conditionAttribute = jsxElement.openingElement.attributes
            .filter(a=> (a as t.JSXAttribute).name.name === "condition")[0]
        let condition = ""
        if (conditionAttribute !== undefined) {
            const value = (conditionAttribute as t.JSXAttribute).value
            condition = t.isJSXExpressionContainer(value!) ? generate(value.expression) : generate(value)
        }
        // ---- condition node
        const parser = new Parser(jsxElement.children)
        parser.parse()
        newNode.kv.condition = [{
            condition: condition,
            parserNode: parser.parserNode
        }]

        this.parserNode.addChild(newNode)
    }

    resolveElseIf(jsxElement: t.JSXElement) {
        const node = this.parserNode.lastChild
        // ---- condition
        const conditionAttribute = jsxElement.openingElement.attributes
            .filter(a=> (a as t.JSXAttribute).name.name === "condition")[0]
        let condition = ""
        if (conditionAttribute !== undefined) {
            const value = (conditionAttribute as t.JSXAttribute).value
            condition = t.isJSXExpressionContainer(value!) ? generate(value.expression) : generate(value)
        }
        // ---- condition node
        const parser = new Parser(jsxElement.children)
        parser.parse()
        if (node.kv.condition === undefined) {
            // ---e 报错，说明前面没有if
            return
        }
        node.kv.condition.push({
            condition: condition,
            parserNode: parser.parserNode
        })
    }

    resolveElse(jsxElement: t.JSXElement) {
        const node = this.parserNode.lastChild
        // ---- condition node
        const parser = new Parser(jsxElement.children)
        parser.parse()
        if (node.kv.condition === undefined) {
            // ---e 报错，说明前面没有if
            return
        }
        node.kv.condition.push({
            condition: "true",
            parserNode: parser.parserNode
        })

    }

    resolveJSXExpression(jsxElement: t.JSXExpressionContainer) {
        const newNode = new ParserNode("Exp")
        newNode.kv.props.push(this.parseProp("_$content", jsxElement.expression))

        this.parserNode.addChild(newNode)
    }

    resolveJSXElement(jsxElement: t.JSXElement | t.JSXText | t.JSXExpressionContainer | t.JSXFragment | any): any {
        if (Array.isArray(jsxElement)) return jsxElement.forEach(el=>this.resolveJSXElement(el))
        if (t.isJSXFragment(jsxElement)) return this.resolveFragment(jsxElement)
        if (t.isJSXText(jsxElement)) return this.resolveText(jsxElement)
        if (t.isJSXExpressionContainer(jsxElement)) return this.resolveJSXExpression(jsxElement)
        const name = (jsxElement.openingElement.name as t.JSXIdentifier).name
        if (name === "For") return this.resolveFor(jsxElement)
        if (name === "If") return this.resolveIf(jsxElement)
        if (name === "ElseIf") return this.resolveElseIf(jsxElement)
        if (name === "Else") return this.resolveElse(jsxElement)
        this.resolveEl(jsxElement)
    }

    parse() {
        this.resolveJSXElement(this.jsxElement)
    }
}





export function parseBody(bodyCode: string): ParserNode {
    const ast = parse(bodyCode)
    const firstJSXElement = ast.program.body[0].expression 

    const parser = new Parser(firstJSXElement)
    parser.parse()

    return parser.parserNode
}