import {BodyStringBuilder, geneChildNodesArray, isCustomEl, geneId} from './bodyBuilder';
import {ParserEl} from "../parser/parserEl";
import {geneDeps, geneDepsStr, geneIsTwoWayConnected, resolveForBody, geneIdDeps, getIdentifiers} from './utils';


/**
 * idAppendixNum: 
 * -1 => 不返回id => ""
 * 0 => 不加后缀，直接生成uid() => TOGE23FibQ
 * n => 加后缀，加载生成的uid()后面 => TOGE23FibQ_idx0_..._idx_n-1
 */ 
export class Generator {
    derivedArr: string[]
    idDepsArr: {ids: string[], propNames: string[]}[] = []

    constructor(derivedArr: string[]) {
        this.derivedArr = derivedArr
    }
    generate(parserEl: ParserEl) {

        const body = new BodyStringBuilder()
        for (let [idx, child] of parserEl.children.entries()) {
            body.addBody(this.resolveParserEl(child, idx))
        }
        body.add(`return ${geneChildNodesArray(parserEl)}`)

        return body.value
    }

    geneDeps(valueStr: string) {
        return [...new Set([...geneDeps(valueStr, this.derivedArr), ...geneIdDeps(valueStr, this.idDepsArr)])]
    }

    resolveParserEl(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        if (parserEl.tag === "If") return this.resolveIf(parserEl, idx, idAppendixNum, appendix)
        if (parserEl.tag === "For") return this.resolveFor(parserEl, idx, idAppendixNum, appendix)
        if (parserEl.tag === "TextNode") return this.resolveText(parserEl, idx, idAppendixNum, appendix)
        if (parserEl.tag === "Environment") return this.resolveEnv(parserEl, idx,idAppendixNum)
        if (isCustomEl(parserEl)) return this.resolveCustom(parserEl, idx, idAppendixNum, appendix)
        return this.resolveHTML(parserEl, idx, idAppendixNum, appendix)
    }


    resolveIf(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        const body = new BodyStringBuilder()
        const id = geneId(idAppendixNum, appendix)
        const nodeName = `node${idx}`

        body.add(`const ${nodeName} = new _$.IfNode(${id})`)
        for (let idx in parserEl.kv.condition) {
            const condition = parserEl.kv.condition[idx]
            body.add(`${nodeName}._$addCond(() => ${condition.condition}, () => {`)
            const conditionEl = condition.parserEl
            for (let [idx, childEl] of conditionEl.children.entries()) {
                body.addBody(this.resolveParserEl(childEl, idx, idAppendixNum, appendix))
            }
            body.add((`return ${geneChildNodesArray(conditionEl)}`))

            const listenDeps = this.geneDeps(condition.condition)
            if (listenDeps.length > 0) {
                body.add(`}, this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`})`)

        }

        return body
    }


    resolveFor(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        const body = new BodyStringBuilder()
        const childEls = parserEl.kv["parserEl"]
        const key = parserEl.kv["key"]
        let forValueReg = /(?:(?:let)|(?:var))\s+?(.+?)\s+?(?:of)\s+?(.+?)$/

        const id = geneId(idAppendixNum, appendix)
        const item = parserEl.kv.forValue.replace(forValueReg, "$1")
        const array = parserEl.kv.forValue.replace(forValueReg, "$2")

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.ForNode(${id})`)

        const listenDeps = this.geneDeps(array)
        if (listenDeps.length > 0) {
            // ---- 如果有dependencies
            body.add(`${nodeName}._$addNodeFunc((key, _$idx${idAppendixNum}, forNode, updateIdx) => {`)
            body.add(`const ${item} = _$.listen(this, "${item}", ()=>forNode._$getItem(key, _$idx${idAppendixNum}), \
            ${geneDepsStr(listenDeps)}, ${geneId(idAppendixNum+1, "${updateIdx}")})`)
            const newGenerator = new Generator(this.derivedArr)
            newGenerator.idDepsArr = [{ids: getIdentifiers(item), propNames: listenDeps}]
            for (let [idx, cEl] of childEls.children.entries()) {
                const childBody = newGenerator.resolveParserEl(cEl, idx, idAppendixNum+1, "${updateIdx}")
                resolveForBody(childBody, item)
                body.addBody(childBody)
            }
            body.add(`return ${geneChildNodesArray(childEls)}`)
            body.add(`})`)
            if (key) {
                body.add(`${nodeName}._$addKeyFunc(() => {`)
                // ---- 第二个参数，keyFunc
                body.add(`const keys = []`)
                body.add(`for (${parserEl.kv.forValue}) {`)
                body.add(`keys.push(${key})`)
                body.add(("}"))
                body.add(`return keys`)
                body.add(`})`)
            }
            body.add(`${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`${nodeName}._$addNodesArr((() => {`)
            body.add(`const nodesArr = []`)
            // ---- Array.from() 防止里面是个iterator
            body.add(`for (let [_$idx${idAppendixNum}, ${item}] of Array.from(${array}).entries()) {`)
            for (let [idx, cEl] of childEls.children.entries()) {
                body.addBody(this.resolveParserEl(cEl, idx, idAppendixNum+1, appendix))
            }
            body.add(`nodesArr.push(${geneChildNodesArray(childEls)})`)
            body.add("}")
            body.add("return nodesArr")
            body.add("})())")
        }

        return body
    }


    resolveText(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const listenDeps = this.geneDeps(parserEl.kv.value)
        const strSymbol = parserEl.kv.strSymbol
        if (listenDeps.length > 0) {
            body.add(`const node${idx} = new _$.TextNode(() => ${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id}, this, ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`const node${idx} = new _$.TextNode(${strSymbol}${parserEl.kv["value"]}${strSymbol}, ${id})`)
        }

        return body
    }

    resolveHTML(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.HtmlNode("${parserEl.tag}", ${id})`)

        // ---- properties
        for (let {key, value} of [...parserEl.kv.props, ...parserEl.kv.dotProps]) {
            if (key === "element") {
                body.add(`${value} = ${nodeName}._$el`)
                continue
            }
            if (key === "_$content") {
                key = "innerText"
            }
            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)
        }

        // ---- children
        for (let childEl of parserEl.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserEl(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }

        return body
    }


    resolveCustom(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix=""){
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const nodeName = `node${idx}`

        body.add(`const ${nodeName} = new ${parserEl.tag}("${parserEl.tag}", ${id})`)

        // ---- props
        for (let {key, value} of parserEl.kv.props) {
            if (key === "element") {
                body.add(`${nodeName}._$addAfterset(() => ${value} = ${nodeName}._$el)`)
                continue
            }
            if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
                body.add(`_$.addLifeCycle(${nodeName}, () => ${value}, ${key}`)
                continue
            }

            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }

        // ---- dotProps
        for (let {key, value} of parserEl.kv.dotProps) {
            if (key === "element") {
                body.add(`${nodeName}._$addAfterset(() => ${value} = ${nodeName}._$el)`)
                continue
            }
            if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
                body.add(`_$.addLifeCycle(${nodeName}, ${value}, "${key}")`)
                continue
            }

            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addDotProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addDotProp("${key}", ${value})`)

        }


        // ---- child
        for (let childEl of parserEl.children) {
            body.add(`${nodeName}._$addChild((() => {`)
            body.addBody(this.resolveParserEl(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }



        return body
    }


    resolveEnv(parserEl: ParserEl, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.EnvNode(${id})`)
        // ---- child 要先加children
        for (let childEl of parserEl.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserEl(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }

        // ---- props
        for (let {key, value} of parserEl.kv.props) {
            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }

        return body
    }


}

