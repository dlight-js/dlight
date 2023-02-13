import Transpiler from "../transpiler/babelTranspiler"
// @ts-ignore
import * as t from "@babel/types";
import { uid } from "../generator/utils";
import {ParserNode} from "./ParserNode";

function parseProp(
    key: string, valueNode: t.JSXExpressionContainer | t.StringLiteral | t.JSXElement | t.JSXFragment | null | undefined
): {key: string, value: string | boolean, nodes: {[key: string]: ParserNode[]}}
{
    if (!valueNode) return {key, value: true, nodes: {}}
    const newAst = Transpiler.parse(Transpiler.generate(valueNode))
    const nodes: {[key: string]: ParserNode[]} = {}
    Transpiler.traverse(newAst, {
        JSXElement(path: any) {
            const id = uid()
            nodes[id] = parseElements([path.node])
            path.replaceWith(t.stringLiteral(id))
        }
    })
    let value = Transpiler.generate(valueNode)
    if (t.isJSXExpressionContainer(valueNode)) value = value.replace(/^\{(.+)\}$/, "$1")
    if (value.trim() === "") value = "\"\""

    return {key, value, nodes}
}

function parseTag(jsxElement: t.JSXElement): ParserNode {
    const tag = (jsxElement.openingElement.name as t.JSXIdentifier).name

    const props: ({key: string, value: string | boolean, nodes: {[key: string]: ParserNode[]}})[] = []
    for (let attribute of jsxElement.openingElement.attributes) {
        attribute = attribute as t.JSXAttribute
        props.push(parseProp(attribute.name.name as string, attribute.value))
    }

    return {
        tag,
        attr: {props},
        children: parseElements(jsxElement.children as any)
    }
}

function parseText(jsxElement: t.JSXText) {
    const value = jsxElement.value.trim()
    if (value === "") return
    const newNode = {
        tag: "_$text",
        attr: {"_$content": `"${value}"`},
        children: [],
    }
    return newNode
}

function getJsxAttr(jsxElement: t.JSXElement, attrName: string) {
    const attribute = jsxElement.openingElement.attributes
        .find(a=> (a as t.JSXAttribute).name.name === attrName)
    if (!attribute) return attribute

    let prop = ""
    const value = (attribute as t.JSXAttribute).value
    prop = t.isJSXExpressionContainer(value!) ? Transpiler.generate(value.expression) : Transpiler.generate(value)

    return prop
}
// ---- if
function parseIf(jsxElement: t.JSXElement): ParserNode {
    return {
        tag: "if",
        attr: {
            conditions: [{
                condition: getJsxAttr(jsxElement, "cond"),
                parserNodes: parseElements(jsxElement.children as any)
            }]
        },
        children: [],
    }
}

function parseElseIf(jsxElement: t.JSXElement, node: ParserNode) {
    // ---- condition
    node.attr.conditions.push({
        condition: getJsxAttr(jsxElement, "cond"),
        parserNodes: parseElements(jsxElement.children as any)
    })
}

function parseElse(jsxElement: t.JSXElement, node: ParserNode) {
    node.attr.conditions.push({
        condition: "true",
        parserNodes: parseElements(jsxElement.children as any)
    })
}

// ---- for
function parseFor(jsxElement: t.JSXElement): ParserNode {
    return {
        tag: "for",
        attr: {
            item: getJsxAttr(jsxElement, "let"),
            array: getJsxAttr(jsxElement, "of"),
            key: getJsxAttr(jsxElement, "key")
        },
        children: parseElements(jsxElement.children as any),
    }
}

function parseJSXExpression(jsxElement: t.JSXExpressionContainer) {
    return {
        tag: "_",
        attr: {props: [parseProp("_$content", jsxElement)]},
        children: [],
    }
}

function parseElements(jsxElements: (t.JSXElement | t.JSXText | t.JSXExpressionContainer | t.JSXFragment)[]): ParserNode[] {
    const parserNodes = []
    for (let element of jsxElements) {
        if (t.isJSXText(element)) {
            const node = parseText(element)
            if (node) parserNodes.push(node)
            continue
        }
        if (t.isJSXExpressionContainer(element)) {
            parserNodes.push(parseJSXExpression(element))
            continue
        }
        if (t.isJSXFragment(element)) {
            parserNodes.push(...parseElements(element.children as any))
            continue
        }
        const name = (element.openingElement.name as t.JSXIdentifier).name
        if (name === "if") {
            parserNodes.push(parseIf(element))
            continue
        }
        if (name === "else-if") {
            parseElseIf(element, parserNodes[parserNodes.length - 1])
            continue
        }
        if (name === "else") {
            parseElse(element, parserNodes[parserNodes.length - 1])
            continue
        }
        if (name === "for") {
            parserNodes.push(parseFor(element))
            continue
        }
        parserNodes.push(parseTag(element))

    }

    return parserNodes
}

function parseBody(node: t.JSXElement | t.JSXText | t.JSXExpressionContainer | t.JSXFragment): ParserNode[] {
    const children = parseElements([node])
    return children
}

export default parseBody