import {uid} from "../generator/utils";



const commentRegex = /(\/\*[\S\s]*\*\/)|(\/\/.*)/g
export class BodyParser {
    code: string
    codeOut = ""
    c = ""
    idx = -1
    flag = false

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
        return this.codeOut.endsWith("Body()")
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
        this.eat()  // eat {
        const id = uid()
        const body = this.eatBrackets() // eat body
        this.bodyMap[id] = body.replace(commentRegex, "")

        this.codeOut = this.codeOut.slice(0, this.codeOut.length-2) + `= "${id}"`
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