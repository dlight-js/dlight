import {ParserEl} from "./parserEl";

function isCustomEl(str: string) {
    return str[0].toUpperCase() === str[0]
}

export class DlightParser {
    code: string
    token = ""
    c = ""
    idx = -1

    constructor(code: string) {
        this.code = code
    }

    stopCharacters = ["(", ")", "{", "}", " ", "\n", "'", "\"", "`"]

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

    parserEl = new ParserEl('null', -1, '-1')
    el = this.parserEl
    elId = 0
    depth = 0

    addElChild() {
        while (this.el.depth >= this.depth) this.el = this.el.parent!
        this.el.addChild(new ParserEl(this.token, this.el.depth + 1, `${this.elId}`))
        this.elId++
        while (this.el.depth < this.depth) this.el = this.el.lastChild!
        this.erase()
    }

    addCustomEl() {
        this.addElChild()
        this.eatSpace()
        this.eat()  // eat (
        this.eatSpace()
        if (this.look() === "{") {
            this.el.kv["props"] = []
            this.eat()  // eat {
            while (true) {
                while (this.ok() && !["{", ":", ",", "}"].includes(this.look())) {
                    this.eat()
                    this.add()
                }
                const nextC = this.look()
                if (nextC === ":") {
                    this.el.kv["props"].push({key: this.token.trim(), value: ""})
                    this.eat()
                    this.erase()
                } else if (nextC === ",") {
                    this.el.kv["props"][this.el.kv["props"].length - 1].value = this.token.trim()
                    this.eat()
                    this.erase()
                } else if (nextC === "{") {
                    this.eat()
                    this.add()
                    this.eatSubBlock()
                } else if (nextC === "}") {
                    break
                }
            }
            // ---- 最后没有"，"结尾
            if (this.token.trim() !== "") {
                this.el.kv["props"][this.el.kv["props"].length-1].value = this.token.trim()
            }
            this.eat()  // eat }
        }
        this.eat()  // eat )
        this.erase()
    }

    addElKey() {
        this.el.currKey = this.token.slice(1)
        this.erase()
    }

    addStrNode() {
        const strSymbol = this.c
        this.eat()
        if (this.c !== strSymbol) this.add()
        while (this.look() !== strSymbol) {
            this.eat()
            this.add()
            if (this.c === "\\") {
                // ---- 处理escape
                this.eat()
                this.add()
            }
        }
        this.eat() // eat "
        this.addElChild()
        this.el.kv["value"] = this.el.tag
        this.el.tag = "StrNode"
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
    eatValue() {
        this.eatBrackets("(", ")")
    }

    eatSubBlock() {
        this.eatBrackets("{", "}")
    }

    eatKey() {
        this.eatBrackets("[", "]")
    }

    addElValue() {
        // ---- 添加到kv里面
        let isValueEmpty = false
        if (this.token.trim().length === 0) {
            this.token = "true"
            isValueEmpty = true
        }
        let key: string
        if (this.el.currKey.length === 0) {
            key = "_$content"
        } else {
            key = this.el.currKey
            this.el.currKey = ""
        }
        if (!isValueEmpty || key !== "_$content") {
            // ---- 如果是content且是空的，就不添加，不然空的默认添加true
            this.el.kv[key] = this.token
        }
        this.erase()
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
                if (isCustomEl(this.token)) {
                    // ---- 代表是自定义component
                    this.addCustomEl()
                    continue
                }
                // ---- 代表是tag 名称
                this.addElChild()
            }
            // ---- eat掉stopCharacter并做判断
            this.eat()
            if (this.c.trim() !== "") {
                // ---- 是stopCharacters里面非空的
                if (this.c === "(") {
                    this.eatValue()
                    this.addElValue()
                } else if (this.c === "{") {
                    this.depth++
                } else if (this.c === "}") {
                    this.depth--
                    this.el = this.el.parent!
                } else if (["\"", "'", "`"].includes(this.c)) {
                    // ---- 代表纯字符串node
                    this.addStrNode()
                }
            }
        }
    }

    // ---- if
    handleIfish(condition: string) {
        this.erase()
        this.eatSpace()
        this.eat()  // eat {
        this.eatSubBlock()  // eat内部
        // ---- 解析内部
        const newParser = new DlightParser(this.token)
        newParser.parse()
        this.el.kv["condition"].push({
            condition: condition,
            parserEl: newParser.parserEl
        })
        this.erase()
    }

    handleIf() {
        this.addElChild()
        this.eatSpace()
        this.eat() // eat (
        this.eatValue()
        this.el.kv["condition"] = []
        this.handleIfish(this.token)
    }

    handleElseIf() {
        this.erase()
        this.eatSpace()
        this.eat()  // eat (
        this.eatValue()
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
        this.addElChild()
        this.eatSpace()
        this.eat()  // eat (
        this.eatValue()
        const forValue = this.token
        this.erase()
        this.eatSpace()
        this.eat() // eat { or [
         if (this.c === "[") {
             this.eatKey()
             this.el.kv["key"] = this.token
             this.erase()
             this.eatSpace()
             this.eat()  // eat {
        }
        this.eatSubBlock()  // eat内部
        // ---- 解析内部
        const newParser = new DlightParser(this.token)
        newParser.parse()
        this.el.kv["forValue"] = forValue
        this.el.kv["parserEl"] = newParser.parserEl
        this.erase()
    }

}
