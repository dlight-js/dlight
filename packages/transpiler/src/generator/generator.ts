import {BodyStringBuilder, indent, geneChildNodesArray, isCustomEl, geneId} from './bodyBuilder';
import {ParserEl} from "../parser/parserEl";
import {geneDeps, geneDepsStr, geneIsTwoWayConnected} from './utils';

export class Generator {
    derivedArr: string[]

    constructor(derivedArr: string[]) {
        this.derivedArr = derivedArr
    }
    generate(parserEl: ParserEl) {

        const body = new BodyStringBuilder()
        for (let [idx, child] of parserEl.children.entries()) {
            body.addBody(this.resolveParserEl(child, idx))
        }
        body.add(`this._$nodes = ${geneChildNodesArray(parserEl)}`)

        return body.value
    }

    resolveParserEl(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        if (parserEl.tag === "If") return this.resolveIf(parserEl, idx, idAppendixNum)
        if (parserEl.tag === "For") return this.resolveFor(parserEl, idx, idAppendixNum)
        if (parserEl.tag === "TextNode") return this.resolveText(parserEl, idx, idAppendixNum)
        if (parserEl.tag === "Environment") return this.resolveEnv(parserEl, idx,idAppendixNum)
        if (isCustomEl(parserEl)) return this.resolveCustom(parserEl, idx, idAppendixNum)
        return this.resolveHTML(parserEl, idx, idAppendixNum)
    }

    resolveEnv(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        const id = geneId(idAppendixNum)
        const body = new BodyStringBuilder()

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.EnvNode(${id})`)
        for (let childEl of parserEl.kv.parserEl.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserEl(childEl, 0, idAppendixNum).indent())
            body.add(indent(`return node0`))
            body.add(`})())`)
        }
        for (let {key, value} of parserEl.kv.props??[]) {
            const listenDeps = geneDeps(value, this.derivedArr)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addPair("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
            } else {
                body.add(`${nodeName}._$addPair("${key}", ${value})`)
            }
        }

        return body
    }

    resolveIf(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        const body = new BodyStringBuilder()
        const id = geneId(idAppendixNum)
        const nodeName = `node${idx}`

        body.add(`const ${nodeName} = new _$.IfNode(${id})`)
        for (let idx in parserEl.kv.condition) {
            const condition = parserEl.kv.condition[idx]
            body.add(`${nodeName}._$addCond(() => ${condition.condition}, () => {`)
            const conditionEl = condition.parserEl
            for (let [idx, childEl] of conditionEl.children.entries()) {
                body.addBody(this.resolveParserEl(childEl, idx, idAppendixNum).indent())
            }
            body.add(indent((`return ${geneChildNodesArray(conditionEl)}`)))

            const listenDeps = geneDeps(condition.condition, this.derivedArr)
            if (listenDeps.length > 0) {
                body.add(`}, this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`})`)

        }

        return body
    }


    resolveFor(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        const body = new BodyStringBuilder()
        const childEls = parserEl.kv["parserEl"]
        const key = parserEl.kv["key"]
        let forValueReg = /(?:(?:let)|(?:var))\s+?(.+?)\s+?(?:of)\s+?(.+?)$/

        const id = geneId(idAppendixNum)
        const item = parserEl.kv.forValue.replace(forValueReg, "$1")
        const array = parserEl.kv.forValue.replace(forValueReg, "$2")

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.ForNode(${id})`)
        const listenDeps = geneDeps(array, this.derivedArr)
        if (listenDeps.length > 0) {
            body.add(`${nodeName}._$addNodeFunc((${item}, _$idx${idAppendixNum}) => {`)
            for (let [idx, cEl] of childEls.children.entries()) {
                body.addBody(this.resolveParserEl(cEl, idx, idAppendixNum+1).indent())
            }
            body.add(indent(`return ${geneChildNodesArray(childEls)}`))
            body.add(`})`)
            if (key) {
                body.add(`${nodeName}._$addKeyFunc(() => {`)
                // ---- 第二个参数，keyFunc
                body.add(indent(`const keys = []`))
                body.add(indent(`for (${parserEl.kv.forValue}) {`))
                body.add(indent(indent(`keys.push(String(${key}))`)))
                body.add(indent(("}")))
                body.add(indent(`return keys`))
                body.add(`})`)
            }
            body.add(`${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`${nodeName}._$addNodesArr((() => {`)
            body.add(indent(`const nodesArr = []`))
            // ---- Array.from() 防止里面是个iterator
            body.add(indent(`for (let [_$idx${idAppendixNum}, ${item}] of Array.from(${array}).entries()) {`))
            for (let [idx, cEl] of childEls.children.entries()) {
                body.addBody(this.resolveParserEl(cEl, idx, idAppendixNum+1).indent().indent())
            }
            body.add(indent(indent(`nodesArr.push(${geneChildNodesArray(childEls)})`)))
            body.add(indent("}"))
            body.add(indent("return nodesArr"))
            body.add("})())")
        }

        return body
    }

    resolveHTML(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        const id = geneId(idAppendixNum)
        const body = new BodyStringBuilder()
        const kv = parserEl.kv
        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.HtmlNode("${parserEl.tag}", ${id})`)

        // ---- properties
        for (let [key, value] of Object.entries(kv)) {
            if (key === "element") {
                body.add(`${value} = ${nodeName}._$el`)
                continue
            }
            if (key === "_$content") key = "innerText"
            const listenDeps = geneDeps(value as string, this.derivedArr)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)
        }

        // ---- children
        for (let childEl of parserEl.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserEl(childEl, 0, idAppendixNum).indent())
            body.add(indent(`return node0`))
            body.add("})())")
        }

        return body
    }


    resolveCustom(parserEl: ParserEl, idx: number, idAppendixNum: number=0){
        const id = geneId(idAppendixNum)
        const body = new BodyStringBuilder()
        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new ${parserEl.tag}(${id})`)
        for (let {key, value} of parserEl.kv["props"]??[]) {
            const listenDeps = geneDeps(value as string, this.derivedArr)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }
        delete parserEl.kv["props"]
        const kv = parserEl.kv
        for (let k in kv) {
            const listenDeps = geneDeps(kv[k] as string, this.derivedArr)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${k}", () => (${kv[k]}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(kv[k])})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${k}", ${kv[k]})`)
        }

        return body
    }

    resolveText(parserEl: ParserEl, idx: number, idAppendixNum: number=0) {
        const id = geneId(idAppendixNum)
        const body = new BodyStringBuilder()
        const listenDeps = geneDeps(parserEl.kv.value, this.derivedArr)
        const strSymbol = parserEl.kv.strSymbol
        if (listenDeps.length > 0) {
            body.add(`const node${idx} = new _$.TextNode(() => ${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id}, this, ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`const node${idx} = new _$.TextNode(${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id})`)
        }

        return body
    }

}

