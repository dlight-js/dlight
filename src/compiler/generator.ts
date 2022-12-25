import {parseDLBody, ParserEl} from "./parser";

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
    addProperties(parserEl: ParserEl) {
        let kv = parserEl.kv
        for (let key in kv) {
            this.add(`$addProp(this, el${parserEl.idx}, "${key}", \`${kv[key]}\`)`)
        }
    }
}


function resolveSingleParserEl(parserEl: ParserEl) {
    const body = new BodyStringBuilder()
    body.createEl(parserEl)
    body.addProperties(parserEl)
    for (let childEl of parserEl.children) {
        body.addBody(resolveSingleParserEl(childEl))
        body.addChildEl(parserEl, childEl)
    }

    return body
}

function resolveParserEl(parserEl: ParserEl) {
    const body = new BodyStringBuilder()
    let currEl = parserEl.children[0]
    body.addBody(resolveSingleParserEl(currEl))
    body.add("this._$el = el0")

    return body.value
}

export function reconstructBodyStr(str: string) {
    let parserEl = parseDLBody(str)
    console.log(parserEl, 'parserEl')
    return resolveParserEl(parserEl)
}
