import {ParserEl} from "../parser/parserEl";

function isEl(parserEl: ParserEl) {
    return !["If", "For", "StrNode"].includes(parserEl.tag)
}

export function isCustomEl(parserEl: ParserEl) {
    return parserEl.tag[0].toUpperCase() === parserEl.tag[0] && isEl(parserEl)
}


export function newLine(value: string) {
    return `\t\t${value}\n`
}

export function indent(value: string) {
    return "\t" + value
}

export class BodyStringBuilder {
    value: string = ""

    indent() {
        this.value = "\t" + this.value.replaceAll(/\n(?!$)/g, "\n\t")
        return this
    }
    elId(parserEl: ParserEl) {
        return '$'+parserEl.id
    }
    add(value: string) {
        this.value += newLine(value)
    }
    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
    createEl(parserEl: ParserEl) {
        const tag = parserEl.tag

        if (isCustomEl(parserEl)) {
            // ---- 自定义element
            this.add(`const el${this.elId(parserEl)} = new ${tag}()`)
            for (let {key, value} of parserEl.kv["props"]) {
                this.add(`_$.addCElProp(this, el${this.elId(parserEl)}, "${key}", () => (${value}))`)
            }
            delete parserEl.kv["props"]
            return
        } 
        if (parserEl.tag === "StrNode") {
            this.add(`const el${this.elId(parserEl)} = new _$.TextEl(this, () => \`${parserEl.kv["value"]}\`)`)
            return
        }
        // ---- html tag
        this.add(`const el${this.elId(parserEl)} = _$.createEl("${tag}")`)
        
    }
    addProperties(parserEl: ParserEl) {
        const kv = parserEl.kv
        if (isCustomEl(parserEl)) {
            for (let k in kv) {
                this.add(`_$.addCElDotProp(this, el${this.elId(parserEl)}, "${k}", () => (${kv[k]}))`)
            }
            return
        }        
        if (parserEl.tag === "StrNode") return
        
        for (let key in kv) {
            // ---- 处理content，htmlTag直接变成innerText
            if (key === "_$content") {
                this.add(`_$.addElProp(this, el${this.elId(parserEl)}, "innerText", () => (${kv[key]}))`)
                continue
            }
            if (key === "element") {
                this.add(`${kv[key]} = el${this.elId(parserEl)}`)
                continue
            }
            this.add(`_$.addElProp(this, el${this.elId(parserEl)}, "${key}", () => (${kv[key]}))`)

        }

    }

    geneChildElArray(parserEl: ParserEl) {
        return "[" + parserEl.children.map(el=>"el"+this.elId(el)).join(", ") + "]"
    }

    addChildEl(parserEl: ParserEl) {
        if (parserEl.children.length === 0) return
        this.add(`_$.addEls(this, el${this.elId(parserEl)}, ${this.geneChildElArray(parserEl)})`)
    }
}