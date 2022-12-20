import {$createEl, $listen} from './func';
class ParserEl {
    tag: string = ""
    currKey: string = ""
    kv: any = {}
    children: ParserEl[] = []
    parent?: ParserEl
    depth: number
    constructor(tag: string, depth: number) {
        this.tag = tag
        this.depth = depth
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
    const parserEl = new ParserEl('root', -1)
    let currEl = parserEl
    let valueDepth = 0
    let depth = 0
    const addToken = () => {
      if (curr.length > 0) {
        tokens.push(curr)
        curr = ""
      }
    }
    const getToken = () => {
        return tokens.pop()!
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
                    if (currEl.depth >= depth) currEl = currEl.parent!
                    currEl.addChild(new ParserEl(lastTokenOP, currEl.depth+1))
                    if (currEl.depth < depth) currEl = currEl.lastChild
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
                    currEl.addChild(new ParserEl(getToken(), depth))
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


function resolveParserEls(parserEls: ParserEl) {
    const el = `
    const { $createEl, $listen } = arguments[0]
    `
    console.log(parserEls)

}


export function view(strArr: TemplateStringsArray) {
    const str = strArr[0]
    let parserEl = parseDLBody(str)
    resolveParserEls(parserEl)
}
  