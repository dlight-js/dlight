import {uid} from "../generator/utils";


class Parser {
    code: string
    codeOut = ""
    c = ""
    idx = -1
    flag = false
    commentRegex = /(\/\*[\S\s]*\*\/)|(\/\/.*)/g

    bodyMap: {[key:string]: string} = {}

    constructor(code: string) {
        this.code = code
    }


    ok() {
        return this.idx < this.code.length - 1
    }

    look() {
        return this.code[this.idx + 1]
    }

    eat() {
        this.idx++
        this.c = this.code[this.idx]
    }

    add() {
        this.codeOut += this.c
    }

    eatSpace() {
        while (this.ok() && this.look().trim() === "") {
            this.eat()
        }
    }
    metBody() {
        return /Body\(\)\s*\{$/.test(this.codeOut)
    }
    eatBrackets() {
        if (!this.flag) this.flag = true
        let token = ""
        let depth = 1
        while (this.ok()) {
            this.eat()
            if (this.c === "{") {
                depth++
            } else if (this.c === "}") {
                depth--
                if (depth === 0) break
            }
            token += this.c
        }
        return token
    }
    eatBody() {
        this.eatSpace()
        const id = uid()
        const body = this.eatBrackets() // eat body
        this.bodyMap[id] = body.replace(this.commentRegex, "")

        this.codeOut = this.codeOut.replace(/\(\)\s*\{$/, "") + `= "${id}"`
    }

    parse() {
        while (this.ok()) {
            while (this.ok() && !this.metBody()) {
                this.eat()
                this.add()
            }
            if (this.ok()) this.eatBody()

        }
        return this.codeOut
    }
}


export function alterBody(fileCode: string) {
    const parser = new Parser(fileCode)
    parser.parse()

    return {code: parser.codeOut, bodyMap: parser.bodyMap}
}