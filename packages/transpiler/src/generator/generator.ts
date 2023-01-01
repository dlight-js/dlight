import {BodyStringBuilder, indent} from "./bodyBuilder";
import {ParserEl} from "../parser/parserEl";

export class Generator {

    static resolveIf(parserEl: ParserEl) {
        const body = new BodyStringBuilder()

        body.add(`const el${body.elId(parserEl)} = new _$.IfEl([`)
        for (let idx in parserEl.kv.condition) {
            const condition = parserEl.kv.condition[idx]
            body.add(indent("{"))
            body.add(indent(indent(`cond: () => ${condition.condition},`)))
            body.add(indent(indent(`el: () => {`)))
            const conditionEl = condition.parserEl
            for (let childEl of conditionEl.children) {
                body.addBody(this.resolveParserEl(childEl).indent().indent().indent())
            }
            body.add(indent(indent(indent(`return ${body.geneChildElArray(conditionEl)}`))))
            body.add(indent(indent("}")))
            body.add(indent("},"))
        }
        body.add(`])`)

        return body
    }


    static resolveFor(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        const childEl = parserEl.kv["parserEl"]
        const key = parserEl.kv["key"]
        let forValueReg = /((let)|(var))\s+?(\S+?)\s+?(of)\s+?(\S+?)$/

        body.add(`const el${body.elId(parserEl)} = new _$.ForEl(item => {`)
        // ---- 第一个参数，elFunc
        const item = parserEl.kv["forValue"].replace(forValueReg, "$4")
        body.add(indent(`const ${item} = item`))
        for (let cEl of childEl.children) {
            body.addBody(this.resolveParserEl(cEl).indent().indent())
        }
        body.add(indent(`return ${body.geneChildElArray(childEl)}`))
        body.add(`}, () => {`)
        // ---- 第二个参数，keyFunc
        body.add(indent(`const keys${body.elId(parserEl)} = []`))
        if (!key) body.add(indent(`let keyIdx${body.elId(parserEl)} = 0`))
        body.add(indent(`for (${parserEl.kv["forValue"]}) {`))
        if (!!key) {
            body.add(indent(indent(`keys${body.elId(parserEl)}.push(String(${key}))`)))
        } else {
            body.add(indent(indent(`keys${body.elId(parserEl)}.push(keyIdx${body.elId(parserEl)})`)))
            body.add(indent(indent(`keyIdx${body.elId(parserEl)} ++`)))
        }
        body.add(indent(("}")))
        body.add(indent(`return keys${body.elId(parserEl)}`))
        const array = parserEl.kv["forValue"].replace(forValueReg, "$6")
        body.add(`}, () => (${array}))`)

        return body
    }

    static resolveParserEl(parserEl: ParserEl) {
        if (parserEl.tag === "If") return this.resolveIf(parserEl)
        if (parserEl.tag === "For") return this.resolveFor(parserEl)

        const body = new BodyStringBuilder()
        body.createEl(parserEl)
        body.addProperties(parserEl)
        for (let childEl of parserEl.children) {
            body.addBody(this.resolveParserEl(childEl))
        }
        body.addChildEl(parserEl)

        return body
    }

    static generate(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        for (let child of parserEl.children) {
            body.addBody(this.resolveParserEl(child))
        }
        body.add(`this._$el = ${body.geneChildElArray(parserEl)}`)

        return body.value
    }

}

