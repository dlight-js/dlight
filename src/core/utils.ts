import {HtmlNode} from "./Nodes";
import {DLightNode} from "./Nodes/DLightNode";
import { EnvNode } from "./Nodes/EnvNode";

export function addDep(dl: DLightNode, dep: string, id: string, func: (newValue?: any) => any) {
    dl._$deps[dep][id] = func
}
export function addDeps(dl: DLightNode, deps: string[], id: string, func: (newValue?: any) => any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func)
    }
}


export function deleteDep(dl: DLightNode, depName: string, id: string) {
    delete dl._$deps[depName][id]
}

export function deleteDeps(dl: DLightNode, id: string) {
    for (let depName in dl._$deps) {
        deleteDep(dl, depName, id)
    }
}

export function deleteDepsPrefix(dl: DLightNode, prefix: string) {
    for (let depName in dl._$deps ?? {}) {
        for (let id in dl._$deps[depName] ?? {}) {
            if (id.startsWith(prefix)) {
                delete dl._$deps[depName][id]
            }
        }
    }
}


export function render(selectName: string, dl: DLightNode) {
    const appNode = new HtmlNode("div")
    appNode._$addNode(dl)
    appNode._$addProp("id", selectName)
    appNode._$init()
    document.querySelector(selectName)!.replaceWith(appNode._$el)
}

// ---- 比下面生成uuid省很多时间（1000个省3ms），但是有可能重复（36^13=1.6^20的概率)，trade off了
export function uid() {
    return Math.random().toString(20).slice(2)
}

export function runDeps(dl: DLightNode | EnvNode, depName: string) {
    for (let id in (dl._$deps??{})[depName] ?? []) {
        for (let dep of dl._$deps[depName][id]) {
            dep.call(dl)
        }
    }
}


// ---- 用在for里面，用eval会变慢，但为了识别特殊for，没办法了
export function listen(dlScope: DLightNode, valueStr: string, valueFunc: () => any, listenDeps: string[], id: string) {
    valueStr = valueStr.trim()
    const replacedValueStr = valueStr.replace(/([_$a-zA-Z][_$a-zA-Z0-9]*)/g, "_$1")
    let idArr = valueStr.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g) ?? []
    // ----
    let evalStr = `let ${valueStr} = arguments[0]\n`
    for (let id of idArr) {
        evalStr += `${id} = {value: ${id}}\n`
    }
    evalStr += `return ${valueStr}`
    let valueObj = new Function(evalStr)(valueFunc())

    // ----
    let newEvalStr = `let ${valueStr} = arguments[0]\n`
    for (let id of idArr) {
        newEvalStr += `let _${id} = ${id}\n`
    }
    newEvalStr += `return ${replacedValueStr}\n`

    // ----
    let geneEvalStr = `let ${replacedValueStr} = middleObj\n`
    geneEvalStr += `let ${valueStr} = valueObj\n`
    for (let id of idArr) {
        geneEvalStr += `${id}.value = _${id}\n`
    }

    addDeps(dlScope, listenDeps, id, () => {
        const value = valueFunc()
        // ---- 空了直接删除
        if (value === undefined) {
            deleteDeps(dlScope, id)
            return
        }
        // @ts-ignore
        const middleObj = new Function(newEvalStr)(value)
        eval(geneEvalStr)
    })
    return valueObj
}

