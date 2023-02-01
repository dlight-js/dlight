import { uid } from "../generator/utils";
import { ParserNode } from "../ParserNode";
// @ts-ignore
import * as babel from "@babel/core"
// @ts-ignore
import babelGenerate from "@babel/generator"
// @ts-ignore
import traverse from "@babel/traverse"
const babelConfig = {
    filename: "*.ts",
    presets: ["@babel/preset-typescript"]
}
const parse = (code: string) => babel.parse(code, babelConfig)
const generate = (ast: any) => babelGenerate(ast).code




class Parser {
    code: string
    token = ""
    c = ""
    idx = -1

    constructor(code: string) {
        this.code = code
    }

    stopCharacters = ["(", "{", " ", "\n", "\"", "`", "'"]

    ok() {
        return this.idx < this.code.length - 1
    }

    look() {
        return this.code[this.idx+1]
    }

    eat() {
        this.idx ++
        this.c = this.code[this.idx]
    }

    add() {
        this.token += this.c
    }

    erase() {
        this.token = ""
    }

    eatSpace() {
        while (this.ok() && this.look().trim() === "") {
            this.eat()
        }
    }

    parserNode = new ParserNode('null')
    get el() {
        return this.parserNode.lastChild
    } 

    addElKey() {
        const key = this.token.slice(1)
        this.erase()
        this.eatSpace()
        this.eat()  // eat (
        this.eatSpace()
        let content = this.eatContent()
        if (content.trim() === "") {
            content = "true"
        }
        this.el.kv.props.push(this.parseProp(key, content))
        this.erase()
    }

    eatBrackets(left: string, right: string) {
        let depth = 1
        while (this.ok()) {
            this.eat()
            if (this.c === left) {
                depth++
            } else if (this.c === right) {
                depth--
                if (depth === 0) break
            }
            this.add()
        }
    }
    // ---- ("value") 情况
    eatParentheses() {
        this.eatBrackets("(", ")")
    }

    eatCurlyBrackets() {
        this.eatBrackets("{", "}")
    }

    eatSquareBrackets() {
        this.eatBrackets("[", "]")
    }

    eatContent() {
        this.eatParentheses()
        const content = this.token
        this.erase()
        return content
    }

    eatSubEl() {
        this.eatCurlyBrackets()
        const newParser = new Parser(this.token)
        newParser.parse()
        this.erase()

        return newParser.parserNode
    }

    parse() {
        while (this.ok()) {
            // ---- 只要不碰到stopCharacter，就一直加到token里面
            while (this.ok() && !this.stopCharacters.includes(this.look())) {
                this.eat()
                this.add()
            }

            if (this.token.trim() !== "") {
                if (["If", "ElseIf", "Else"].includes(this.token)) {
                    this.resolveIf(this.token)
                    continue
                }
                if (["For"].includes(this.token)) {
                    this.resolveFor()
                    continue
                }
                if (this.token.startsWith(".")) {
                    // ---- 代表是key
                    this.addElKey()
                    continue
                }
                this.resolveEl()
            } else {
                this.eat() 
                if (["\"", "'", "`"].includes(this.c)) {
                    // TextNode
                    this.add()
                    const strSymbol = this.c
                    while (this.ok() && 
                        (["\\"].includes(this.c) || !(this.look()===strSymbol))
                    ) {
                        this.eat()
                        this.add()
                    }
                    if (this.ok()) {
                        this.eat()
                        this.add()
                        this.resolveText()
                    }
                }
            }
        }
    }

    parseProp(key: string, value: string) {
        let depth = 0
        let tempSubContent = ""
        let newContent = ""
        const prop: any = {key, nodes: {}}
        for (let idx=0; idx < value.length; idx++) {
            if (value[idx] === "@" && value[idx+1] === "{") {
                depth ++
                idx ++
            } else if (value[idx] === "}" && depth === 1) {
                depth --
                const id = uid()
                newContent += "\"" + id + "\""
                const newParser = new Parser(tempSubContent)
                newParser.parse()
                prop.nodes[id] = newParser.parserNode
                tempSubContent = ""
            } else if (depth !== 0) {
                tempSubContent += value[idx]
            } else {
                newContent += value[idx]
            }
        }
        prop.value = newContent
        return prop
    }

    resolveText() {
        const newNode =  new ParserNode("text")
        newNode.kv.strSymbol = this.token[0]
        newNode.kv.value = this.token.slice(1, -1)
        this.erase()
        this.parserNode.addChild(newNode)
    }

    resolveEl() {
        const newNode =  new ParserNode(this.token)
        this.erase()
        this.eatSpace()
        if (this.look() === "(") {
            this.eat()  // eat (
            this.eatSpace()

            if (this.look() === "{") { // 参数
                const content = this.eatContent()
                const ast = parse(`(${content})`)
                const props = ast.program.body[0].expression.properties
                for (let prop of props) {
                    newNode.kv.props.push(this.parseProp(prop.key.name, generate(prop.value)))
                }
            } else {
                const content = this.eatContent()
                if (content.trim() !== "") {
                    newNode.kv.props.push(this.parseProp("_$content", content))
                }
            }
            this.eatSpace()
        }

        if (this.look() === "{")  { // 子
            this.eat() // eat {
            newNode.children = this.eatSubEl().children // add children
        }

        this.parserNode.addChild(newNode)
    }

    // ---- if
    handleIfish(condition: string) {
        this.erase()
        this.eatSpace()
        this.eat()  // eat {
        const subEl = this.eatSubEl()
        this.el.kv.condition.push({
            condition: condition,
            parserNode: subEl
        })
        this.erase()
    }

    handleIf() {
        this.parserNode.addChild(new ParserNode(this.token))
        this.erase()
        this.eatSpace()
        this.eat() // eat (
        this.eatParentheses()
        this.el.kv.condition = []
        this.handleIfish(this.token)
    }

    handleElseIf() {
        this.erase()
        this.eatSpace()
        this.eat()  // eat (
        this.eatParentheses()
        this.handleIfish(this.token)
    }

    handleElse() {
        this.handleIfish("true")
    }

    resolveIf(token: string) {
        if (token === "If") {
            this.handleIf()
        } else if (token === "ElseIf") {
            this.handleElseIf()
        } else if (token === "Else") {
            this.handleElse()
        }
    }

    // ---- for
    resolveFor() {
        const newNode = new ParserNode(this.token)
        this.erase()
        this.eatSpace()
        this.eat()  // eat (
        this.eatParentheses()
        newNode.kv.forValue = this.token
        this.erase()
        this.eatSpace()
        this.eat() // eat { or [
        if (this.c === "[") {
            this.eatSquareBrackets()
            newNode.kv.key = this.token
            this.erase()
            this.eatSpace()
            this.eat()  // eat {
        }

        newNode.children = this.eatSubEl().children
        this.parserNode.addChild(newNode)
    }
}


export function parseBody(bodyCode: string): ParserNode {
    const parser = new Parser(bodyCode)
    parser.parse()

    return parser.parserNode
}