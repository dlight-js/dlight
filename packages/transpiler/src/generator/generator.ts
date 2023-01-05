import {BodyStringBuilder, indent, elId, geneChildElArray, isCustomEl, geneId} from './bodyBuilder';
import {ParserEl} from "../parser/parserEl";
import {geneDeps, uid} from './utils';

export class Generator {
    static generate(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        for (let child of parserEl.children) {
            body.addBody(this.resolveParserEl(child))
        }
        body.add(`this._$el = ${geneChildElArray(parserEl)}`)

        return body.value
    }

    static resolveParserEl(parserEl: ParserEl, idAppendix?: string) {
        if (parserEl.tag === "If") return this.resolveIf(parserEl, idAppendix)
        if (parserEl.tag === "For") return this.resolveFor(parserEl, idAppendix)
        if (parserEl.tag === "TextNode") return this.resolveText(parserEl, idAppendix)
        if (parserEl.tag === "Environment") return this.resolveEnv(parserEl, idAppendix)
        if (isCustomEl(parserEl)) return this.resolveCustom(parserEl, idAppendix)
        return this.resolveHTML(parserEl, idAppendix)
    }

    static resolveEnv(parserEl: ParserEl, idAppendix?: string) {
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()

        body.add(`const el${elId(parserEl)} = new _$.EnvEl(${parserEl.kv.envObject}, () => {`)
        
        for (let childEl of parserEl.kv.parserEl.children) {
            body.addBody(this.resolveParserEl(childEl).indent())
        }
        body.add(indent(`return ${geneChildElArray(parserEl.kv.parserEl)}`))
        body.add(`}, ${id})`)

        return body
    }

    static resolveIf(parserEl: ParserEl, idAppendix?: string) {
        const body = new BodyStringBuilder()
        const id = geneId(idAppendix)

        body.add(`const el${elId(parserEl)} = new _$.IfEl([`)
        for (let idx in parserEl.kv.condition) {
            const condition = parserEl.kv.condition[idx]
            body.add(indent("{"))
            body.add(indent(indent(`cond: () => ${condition.condition},`)))
            body.add(indent(indent(`el: () => {`)))
            const conditionEl = condition.parserEl
            for (let childEl of conditionEl.children) {
                body.addBody(this.resolveParserEl(childEl).indent().indent().indent())
            }
            body.add(indent(indent(indent(`return ${geneChildElArray(conditionEl)}`))))
            body.add(indent(indent("},")))
            body.add(indent(indent(`deps: ${geneDeps(condition.condition)}`)))
            body.add(indent("},"))
        }
        body.add(`], ${id})`)

        return body
    }


    static resolveFor(parserEl: ParserEl, idAppendix?: string) {
        const body = new BodyStringBuilder()
        const childEl = parserEl.kv["parserEl"]
        const key = parserEl.kv["key"]
        let forValueReg = /((let)|(var))\s+?(\S+?)\s+?(of)\s+?(\S+?)$/

        const id = geneId(idAppendix)
        body.add(`const el${elId(parserEl)} = new _$.ForEl((item, idx) => {`)
        // ---- 第一个参数，elFunc
        const item = parserEl.kv.forValue.replace(forValueReg, "$4")
        body.add(indent(`const ${item} = item`))
        for (let cEl of childEl.children) {
            body.addBody(this.resolveParserEl(cEl, `\${idx}`).indent().indent())
        }
        body.add(indent(`return ${geneChildElArray(childEl)}`))
        const array = parserEl.kv.forValue.replace(forValueReg, "$6")
        if (key) {
            body.add(`}, () => {`)
             // ---- 第二个参数，keyFunc
            body.add(indent(`const keys${elId(parserEl)} = []`))
            body.add(indent(`for (${parserEl.kv.forValue}) {`))
            body.add(indent(indent(`keys${elId(parserEl)}.push(String(${key}))`)))
            body.add(indent(("}")))
            body.add(indent(`return keys${elId(parserEl)}`))
            // ---- 第三四五个参数，forValue和deps和id
            body.add(`}, () => (${array}), ${geneDeps(array)}, ${id})`)
        } else {
            body.add(`}, undefined, () => (${array}), ${geneDeps(array)}, ${id})`)
        }
       

        return body
    }

    static resolveHTML(parserEl: ParserEl, idAppendix?: string) {
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        const kv = parserEl.kv
        body.add(`const el${elId(parserEl)} = new _$.HTMLEl("${parserEl.tag}", ${id})`)
        // ---- properties
        for (let key in kv) {
            // ---- 处理content，htmlTag直接变成innerText
            if (key === "_$content") {
                body.add(`_$.addElProp(this, el${elId(parserEl)}, "innerText", () => (${kv[key]}), ${geneDeps(kv[key])})`)
                continue
            }
            if (key === "element") {
                body.add(`${kv[key]} = el${elId(parserEl)}.el`)
                continue
            }
            body.add(`_$.addElProp(this, el${elId(parserEl)}, "${key}", () => (${kv[key]}), ${geneDeps(kv[key])})`)
        }
        for (let childEl of parserEl.children) {
            body.addBody(this.resolveParserEl(childEl, idAppendix))
        }
        if (parserEl.children.length === 0) return body
        body.add(`_$.addEls(this, el${elId(parserEl)}, ${geneChildElArray(parserEl)})`)

        return body
    }


    static resolveCustom(parserEl: ParserEl, idAppendix?: string){
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        body.add(`const el${elId(parserEl)} = new ${parserEl.tag}(${id})`)
        for (let {key, value} of parserEl.kv["props"]??[]) {
            body.add(`_$.addCElProp(this, el${elId(parserEl)}, "${key}", () => (${value}))`)
        }
        delete parserEl.kv["props"]
        const kv = parserEl.kv
        for (let k in kv) {
            body.add(`_$.addCElDotProp(this, el${elId(parserEl)}, "${k}", () => (${kv[k]}))`)
        }

        return body
    }

    static resolveText(parserEl: ParserEl, idAppendix?: string) {
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        body.add(`const el${elId(parserEl)} = new _$.TextEl(this, () => \`${parserEl.kv["value"]}\`, ${id})`)
        return body
    }

}

