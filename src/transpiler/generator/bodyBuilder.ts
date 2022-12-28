import {ParserEl} from "../parser/parserEl";

function isEl(parserEl: ParserEl) {
    return !["If"].includes(parserEl.tag)
}

function isCustomEl(parserEl: ParserEl) {
    return parserEl.tag[0].toUpperCase() === parserEl.tag[0] && isEl(parserEl)
}


export const newLine = (value: string) => `\t\t${value}\n`

export class BodyStringBuilder {
    value: string = ""

    elId(parserEl: ParserEl) {
        return '$'+parserEl.id
    }
    add(value: string) {
        console.log(value)
        this.value += newLine(value)
    }
    addBody(body: BodyStringBuilder) {
        this.value += body.value
    }
    createEl(parserEl: ParserEl) {
        const tag = parserEl.tag

        if (isCustomEl(parserEl)) {
            // ---- 自定义element
            this.add(`const ce${this.elId(parserEl)} = new ${tag}(${parserEl.kv["_$content"]??""})`)
            this.add(`const el${this.elId(parserEl)} = ce${this.elId(parserEl)}.render()`)
            delete parserEl.kv._$content
            return
        } else {
            // ---- html tag
            this.add(`const el${this.elId(parserEl)} = _$.createEl("${tag}")`)
        }
    }
    addProperties(parserEl: ParserEl) {
        const kv = parserEl.kv
        for (let k in kv) {
            // ---- 处理content，htmlTag直接变成innerText
            const key = k === "_$content" ? "innerText" : k
            this.add(`_$.addProp(this, el${this.elId(parserEl)}, "${key}", () => ${kv[k]})`)
        }
    }

    childrenWillMount(parserEl: ParserEl) {
        for (let childEl of parserEl.children) {
            if (isCustomEl(childEl)) this.add(`ce$${childEl.id}.willMount()`)
        }
    }
    childrenDidMount(parserEl: ParserEl) {
        for (let childEl of parserEl.children) {
            if (isCustomEl(childEl)) this.add(`ce$${childEl.id}.didMount()`)
        }
    }

    addChildEl(parserEl: ParserEl, conditions: String[], conditionValues: String[]) {
        if (parserEl.children.length === 0) return
        if (!parserEl.children.map(el=>isEl(el)).includes(true)) return // 全是if之类的

        const childrenElNames = parserEl.children.map(el=>"el"+this.elId(el)).join(", ")
        if (conditions.length === 0) {
            this.childrenWillMount(parserEl)
            this.add(`_$.addChildEls(el${this.elId(parserEl)}, [${childrenElNames}])`)
            this.childrenDidMount(parserEl)
        } else {
            // ---- 有if之类的
            this.add(`const elChildFunc${this.elId(parserEl)} = () => {`)
            for (let condition of conditions) {
                this.value += condition
            }
            this.add(`\treturn [${childrenElNames}]`)
            this.add("}")
            this.add(`_$.listenChildEls(this, el${this.elId(parserEl)}, [() => ${conditionValues.join(", () => ")}], elChildFunc${this.elId(parserEl)})`)
        }

    }
}