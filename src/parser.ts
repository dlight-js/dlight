import {$createEl, $listen} from './func';
import {DLBase} from "./DLBase";
import {DecoratorMaker} from "./decorator";
class ParserEl {
    tag: string = ""
    currKey: string = ""
    kv: any = {}
    children: ParserEl[] = []
    parent?: ParserEl
    depth: number
    idx: number
    constructor(tag: string, depth: number, idx: number) {
        this.tag = tag
        this.depth = depth
        this.idx = idx
    }

    get lastChild(): ParserEl {
        if (this.children.length === 0) return this
        return this.children[this.children.length - 1]
    }

    addChild(child: ParserEl) {
        this.children.push(child)
        child.parent = this
    }
}


enum ParserCharacter {
    openParen="(",
    closeParen=")",
    openBrace="{",
    closeBrace="}",
    space=" ",
    newLine="\n"
}



export function parseDLBody(str: string) {
    let curr = ""
    const tokens: string[] = []
    const parserEl = new ParserEl('null', -1, -1)
    let currEl = parserEl
    let valueDepth = 0
    let depth = 0
    let idx = 0
    const addToken = () => {
      if (curr.length > 0) {
        tokens.push(curr)
        curr = ""
      }
    }
    const getToken = () => {
        return tokens.pop()!
    }
    const addChild = (tag: string) => {
        while (currEl.depth >= depth) currEl = currEl.parent!
        currEl.addChild(new ParserEl(tag, currEl.depth+1, idx))
        idx ++
        while (currEl.depth < depth) currEl = currEl.lastChild
    }

    for (let c of str) {
        // ---- valueDepth !== 0 代表正在收集value，单纯加就行，对于右小括号是不等于1
        if ((valueDepth !== 1 && c === ParserCharacter.closeParen) || 
            (valueDepth !== 0 && c !== ParserCharacter.closeParen)) {
            curr += c
            if (c === ParserCharacter.openParen) valueDepth ++
            if (c === ParserCharacter.closeParen) valueDepth --
            continue
        }

        switch(c) {
        case ParserCharacter.space:
        case ParserCharacter.newLine:
            addToken()
            break
        // --------------------
        case ParserCharacter.openParen:
            // --v1 左小括号，当前不是空的代表前面有值，没有被空格收集起来
            // ---- curr.length == 0  =>  div ()
            //      curr.length > 0  =>  div()
            if (curr.length > 0) addToken()
            const lastTokenOP = tokens.pop()!
            if (!lastTokenOP.startsWith(".")) {
                // ---a 非.开头，加入children
                addChild(lastTokenOP)
            } else {
                // ---b .开头，加入kv
                currEl.currKey = lastTokenOP.slice(1)
            }
            valueDepth ++
            break
        // --------------------
        case ParserCharacter.closeParen:
            // --v2 右小括号，把前面的当成value收集起来
            // ---- value是空，默认传true
            if (curr.trim().length === 0) {
                curr = "true"
            }
            addToken()
            let key: string
            if (currEl.currKey.length === 0) {
                key = "_$content"
            } else {
                key = currEl.currKey
                currEl.currKey = ''
            }
            currEl.kv[key] = getToken()
            valueDepth --
            break
        // --------------------
        case ParserCharacter.openBrace:
            // --t1 左大括号
            // ---- curr.length == 0  =>  div {} / div(){}
            //      curr.length > 0  =>  div{}
            if (curr.length > 0) addToken()
            // ---- tokens.length == 0  =>  div(){}
            //      tokens.length > 0  =>  div{}
            if (tokens.length > 0) {
                addChild(getToken())
            }
            currEl = currEl.lastChild
            depth ++
            break
        // --------------------
        case ParserCharacter.closeBrace:
            depth --
            while (currEl.depth > depth) {
                currEl = currEl.parent!
            }
            break
        // --------------------
        default:
            curr += c
        }
    }
    return parserEl
}

class BodyStringBuilder {
    value: string = ""
    add(value: string) {
        this.value += `${value}\n`
    }
    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
    createEl(parserEl: ParserEl) {
        this.add(`const el${parserEl.idx} = $createEl('${parserEl.tag}')`)
    }
    addChildEl(parserEl: ParserEl, childEl: ParserEl) {
        const parserElStr = `el${parserEl.idx}`
        const childElStr = `el${childEl.idx}`
        this.add(`${parserElStr}.appendChild(${childElStr})`)
    }
    addProperty(parserEl: ParserEl, dl: DLBase) {
        const parserElStr = `el${parserEl.idx}`
        const tagFirstC = parserEl.tag[0]
        if (tagFirstC.toLowerCase() === tagFirstC) {
            // ---- 小写字母开头，是html tag
            let kv = parserEl.kv
            this.handleStateReplace(kv, parserElStr, dl)
        }
    }
    handleStateReplace(kv: any, parserElStr: string, dl: DLBase) {
        // ---- 处理content，htmlTag直接变成innerText
        if (kv["_$content"] !== undefined) {
            kv["innerText"] = kv["_$content"]
            delete kv["_$content"]
        }
        // ----
        const stateKeys = Object.keys(dl._$deps)
        for (let key in kv) {
            const listenDeps = []
            let value = kv[key]
            for (let stateKey of stateKeys) {
                if (value.includes(stateKey)) {
                    listenDeps.push(stateKey)
                    value = value.replaceAll(stateKey, `this.${DecoratorMaker.state(stateKey)}`)
                }
            }
            if (listenDeps.length === 0 || ["onclick"].includes(key)) {
                // ---- 没有依赖
                this.add(`${parserElStr}.${key} = ${value}`)
            } else {
                this.add(`$listen(this, ${parserElStr}, "${key}", ["${listenDeps.join('", "')}"], ()=>${value})`)
            }
        }
    }
}





function resolveSingleParserEl(parserEl: ParserEl, dl: DLBase) {
    const body = new BodyStringBuilder()
    body.createEl(parserEl)
    body.addProperty(parserEl, dl)
    for (let childEl of parserEl.children) {
        body.addBody(resolveSingleParserEl(childEl, dl))
        body.addChildEl(parserEl, childEl)
    }

    return body
}

function resolveParserEls(parserEl: ParserEl, dl: DLBase) {
    const body = new BodyStringBuilder()
    body.add("const { $createEl, $listen } = arguments[0]")
    let currEl = parserEl.children[0]
    body.addBody(resolveSingleParserEl(currEl, dl))
    body.add("this._$el = el0")
    console.log(body.value)
    console.log(parserEl)
    return body.value

}

export function handleBodyStr(str: string, dl: DLBase) {
    let parserEl = parseDLBody(str)
    return resolveParserEls(parserEl, dl)
}

export function view(strArr: TemplateStringsArray) {
    const str = strArr[0]

}
  