import Transpiler from "../transpiler/babelTranspiler"
import * as t from "@babel/types"
import {ParserNode} from "./ParserNode";

function uid() {
    return Math.random().toString(32).slice(2)
}

function parseProp(key: string, propAst: any) {
    if (!propAst) return {key, value: true, nodes: {}}
    const ast = Transpiler.parse(`let _ = ${Transpiler.generate(propAst)}`)
    const nodes: {[key: string]: ParserNode[]} = {}
    Transpiler.traverse(ast, {
        DoExpression(path: any) {
            const node = path.node
            const id = uid()
            nodes[id] = parseBody(node.body.body)
            path.replaceWith(t.stringLiteral(id))
        }
    })
    return {
        key,
        value: Transpiler.generate(ast.program.body[0].declarations[0].init),
        nodes
    }
}

function parseTag(node: t.CallExpression) {
    const parserNode: any = {tag: "", attr: {props: []}, children: []}
    let n = node

    // ---- 会存在.xxx()不知道是预期tag还是prop的情况，所有强制tag只能有一层
    //      比如 div().width(100) 默认用div
    //      第三个&&是排除this.subView()
    // ---- 由于callee是从外到内，所以最后一个循环的就是tag，其余都要加到prop里面
    while (n && (n.callee as t.MemberExpression)?.object
            && !t.isThisExpression((n.callee as t.MemberExpression)?.object)) {
        // ---- 取第1个参数，如果参数是空，那就默认是true
        const prop = n.arguments[0]
        const key = ((n.callee as t.MemberExpression).property as t.Identifier).name
        parserNode.attr.props.unshift(parseProp(key, prop))
        // ---- 继续迭代直到变成tag在同一行
        n = (n.callee as t.MemberExpression).object as t.CallExpression
    }
    if (n.arguments.length > 0) {
        parserNode.attr.props.unshift(parseProp("_$content", n.arguments[0]))
    }
    parserNode.tag = Transpiler.generate(n.callee)
    return parserNode

}

function parseText(node: t.StringLiteral | t.TemplateLiteral) {
    return {tag: '_$text', attr: {"_$content": Transpiler.generate(node)}, children: []}
}

function parseTaggedTemplate(node: t.TaggedTemplateExpression) {
    let taggedParserNodes = parseNode(node.tag)
    if (!Array.isArray(taggedParserNodes)) taggedParserNodes = [taggedParserNodes]
    const templateParserNode = {
        tag: '_$text',
        attr: {"_$content": Transpiler.generate(node.quasi)},
        children: []
    }

    return [...taggedParserNodes, templateParserNode]
}

function parseNode(node: any): ParserNode | ParserNode[] {
    if (t.isCallExpression(node)) return parseTag(node)
    if (t.isStringLiteral(node) || t.isTemplateLiteral(node)) {
        return parseText(node)
    }

    if (t.isTaggedTemplateExpression(node)) return parseTaggedTemplate(node)

    return {} as any
}

function parseFor(node: t.ForOfStatement): ParserNode {
    const item = Transpiler.generate((node.left as any).declarations[0])
    const array = Transpiler.generate(node.right)
    const parserNode: ParserNode = {
        tag: 'for',
        attr: {"item": item, "array": array},
        children: [],
    }
    let childrenNodes = (node.body as any).body
    if (t.isArrayExpression(childrenNodes[0].expression)) {
        parserNode.attr.key = Transpiler.generate(childrenNodes[0].expression.elements[0])
        childrenNodes = childrenNodes.slice(1)
    }
    parserNode.children = parseBlock(childrenNodes)

    return parserNode
}

function parseIf(node: any): ParserNode {
    const conditions = parseIfConditions(node)
    return {
        tag: 'if',
        attr: {conditions},
        children: []
    }
}

function parseIfConditions(node: any) {
    let conditions: ({condition: any, parserNodes: ParserNode[]})[] = []
    const condition = Transpiler.generate(node.test)
    const parserNodes = parseBlock(node.consequent.body)
    conditions.push({condition, parserNodes})
    if (t.isIfStatement(node.alternate)) {
        conditions.push(...parseIfConditions(node.alternate))
    } else if (node.alternate) {
        conditions.push({
            condition: true,
            parserNodes: parseBlock(node.alternate.body),
        })
    }

    return conditions
}

export function parseBlock(nodes: any): ParserNode[] {
    const children = []
    for (let node of nodes) {
        if (t.isExpressionStatement(node)) {
            let parserNodes: any = parseNode(node.expression)
            if (!Array.isArray(parserNodes)) parserNodes = [parserNodes]
            children.push(...parserNodes)
        } else if (t.isBlockStatement(node)) {
            children[children.length-1].children = parseBlock(node.body)
        } else if (t.isForOfStatement(node)) {
            children.push(parseFor(node))
        } else if (t.isIfStatement(node)) {
            children.push(parseIf(node))
        }
    }
    return children
}

function parseBody(nodes: any) {
    return parseBlock(nodes)
}


export default parseBody