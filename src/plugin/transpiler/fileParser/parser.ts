import {reconstructBodyStr} from "../index";

export class DlightBodyParser {
    code: string
    codeOut = ""
    c = ""
    idx = -1
    flag = false

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
        const body = this.eatBrackets()  // eat body
        this.codeOut += " {\n" + reconstructBodyStr(body) + "}"

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