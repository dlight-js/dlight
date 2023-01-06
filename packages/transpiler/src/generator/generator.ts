import {BodyStringBuilder, indent, elId, geneChildElArray, isCustomEl, geneId} from './bodyBuilder';
import {ParserEl} from "../parser/parserEl";
import {geneDeps, uid, geneDepsStr} from './utils';
import {ForNode} from '../../../../src/core/Nodes/ForNode';

export class Generator {
    static generate(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        for (let child of parserEl.children) {
            body.addBody(this.resolveParserEl(child))
        }
        body.add(`this._$nodes = ${geneChildElArray(parserEl)}`)

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

        const el = `el${elId(parserEl)}`
        body.add(`const ${el} = new _$.EnvEl(() => {`)
        for (let childEl of parserEl.kv.parserEl.children) {
            body.addBody(this.resolveParserEl(childEl).indent())
        }
        body.add(indent(`return ${geneChildElArray(parserEl.kv.parserEl)}`))
        body.add(`}, ${id})`)
        for (let {key, value} of parserEl.kv["props"]??[]) {
            body.add(`${el}._$addPair(this, "${key}", () => (${value}), ${geneDeps(value)})`)
        }

        return body
    }

    static resolveIf(parserEl: ParserEl, idAppendix?: string) {
        const body = new BodyStringBuilder()
        const id = geneId(idAppendix)

        body.add(`const el${elId(parserEl)} = new _$.IfEl(this, [`)
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
        const childEls = parserEl.kv["parserEl"]
        const key = parserEl.kv["key"]
        let forValueReg = /((let)|(var))\s+?(\S+?)\s+?(of)\s+?(\S+?)$/

        const id = geneId(idAppendix)
        const array = parserEl.kv.forValue.replace(forValueReg, "$6")
        const item = parserEl.kv.forValue.replace(forValueReg, "$4")

        const nodeName = `node${elId(parserEl)}`
        body.add(`const ${nodeName} = new _$.ForNode(${id})`)
        const listenDeps = geneDeps(array)
        if (listenDeps.length > 0) {
            body.add(`${nodeName}._$addNodeFunc((${item}, idx) => {`)
            for (let cEl of childEls.children) {
                body.addBody(this.resolveParserEl(cEl, `\${idx}`).indent())
            }
            body.add(indent(`return ${geneChildElArray(childEls)}`))
            body.add(`})`)
            if (key) {
                body.add(`${nodeName}._$addKeyFunc(() => {`)
                // ---- 第二个参数，keyFunc
                body.add(indent(`const keys${elId(parserEl)} = []`))
                body.add(indent(`for (${parserEl.kv.forValue}) {`))
                body.add(indent(indent(`keys${elId(parserEl)}.push(String(${key}))`)))
                body.add(indent(("}")))
                body.add(indent(`return keys${elId(parserEl)}`))
                body.add(`})`)
            }
            body.add(`${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`${nodeName}._$addNodesArr((() => {`)
            body.add(indent(`const nodesArr = []`))
            body.add(indent(`let idx = 0`))
            body.add(indent(`for (let ${item} of ${array}) {`))
            for (let cEl of childEls.children) {
                body.addBody(this.resolveParserEl(cEl, `\${idx}`).indent().indent())
            }
            body.add(indent(indent(`nodesArr.push(${geneChildElArray(childEls)})`)))
            body.add(indent(indent("idx ++")))
            body.add(indent("}"))
            body.add(indent("return nodesArr"))
            body.add("})())")
        }

        return body
    }

    static resolveHTML(parserEl: ParserEl, idAppendix?: string) {
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        const kv = parserEl.kv
        const nodeName = `node${elId(parserEl)}`
        body.add(`const ${nodeName} = new _$.HtmlNode("${parserEl.tag}", ${id})`)

        if (parserEl.children.length > 0) {
            body.add(`${nodeName}._$addEls((() => {`)
            for (let childEl of parserEl.children) {
                body.addBody(this.resolveParserEl(childEl, idAppendix).indent())
            }
            body.add(indent(`return ${geneChildElArray(parserEl)}`))
            body.add(`})())`)
        } 
        
        // ---- properties
        for (let [key, value] of Object.entries(kv)) {
            if (key === "element") {
                body.add(`${value}} = ${nodeName}.el`)
                continue
            }
            if (key === "_$content") key = "innerText"
            const listenDeps = geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)
        }

        // ---- children
        for (let childEl of parserEl.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserEl(childEl, idAppendix).indent())
            body.add(indent(`return node${elId(childEl)}`))
            body.add("})())")
        }

        return body
    }


    static resolveCustom(parserEl: ParserEl, idAppendix?: string){
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        const nodeName = `node${elId(parserEl)}`
        body.add(`const ${nodeName} = new ${parserEl.tag}(${id})`)
        for (let {key, value} of parserEl.kv["props"]??[]) {
            const listenDeps = geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
                continue
            } 
            body.add(`${nodeName}._$addProp("${key}", ${value})`)
            
        }
        delete parserEl.kv["props"]
        const kv = parserEl.kv
        for (let k in kv) {
            const listenDeps = geneDeps(kv[k] as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addDotProp(this, "${k}", () => (${kv[k]}), ${geneDepsStr(listenDeps)})`)
                continue
            } 
            body.add(`${nodeName}._$addDotProp(this, "${k}", () => (${kv[k]}))`)
        }

        return body
    }

    static resolveText(parserEl: ParserEl, idAppendix?: string) {
        const id = geneId(idAppendix)
        const body = new BodyStringBuilder()
        const listenDeps = geneDeps(parserEl.kv.value)
        const strSymbol = parserEl.kv.strSymbol
        if (listenDeps.length > 0) {
            body.add(`const node${elId(parserEl)} = new _$.TextNode(() => ${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id}, this, ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`const node${elId(parserEl)} = new _$.TextNode(${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id})`)
        }

        return body
    }

}

