import {hh, HtmlNode} from "./Nodes";
import {DLightNode} from "./Nodes/DLightNode";
import { EnvNode } from "./Nodes/EnvNode";

export function addDep(dl: DLightNode, dep: string, id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    let depFunc
    if (valueFunc) {
        let prevValue: any = undefined
        depFunc = () => {
            const newValue = valueFunc()
            if (prevValue !== newValue) {
                func(newValue)
                prevValue = newValue
            }
        }
    } else {
        depFunc = func
    }
    if (dl._$deps === undefined) dl._$deps = {}
    if (dl._$deps[dep] === undefined) dl._$deps[dep] = {}
    if (dl._$deps[dep][id] === undefined) dl._$deps[dep][id] = []

    let t1 = performance.now();
    dl._$deps[dep][id].push(depFunc)
    let t2 = performance.now()
    hh.value += t2-t1

}
export function addDeps(dl: DLightNode, deps: string[], id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func, valueFunc)
    }
}

export function getCurrListenDeps(dlScope: DLightNode, listenDeps: string[]) {
    return listenDeps.filter(depKey => (dlScope as any)[`_$${depKey}`] !== undefined)
}


export function deleteDeps(dl: DLightNode, id: string) {
    for (let depName in dl._$deps ?? {}) {
        delete dl._$deps[depName][id]
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


export function geneDepsAllowFunc(valueStr: string) {
    // ---- 后续可能用支持in browser的recast，https://github.com/benjamn/recast
    //      目前就字符串匹配 this.xxx  ([^\w$]|^)this.xxx([^\w$]|$)
    const depReg = /(?:[^\w$]|^)this\.(\w+)(?:[^\w$]|$)/g
    const matches = valueStr.matchAll(depReg)
    const listenDeps = Array.from(matches).map(match=>match[1])

    return [...new Set(listenDeps)]
}

export function geneDeps(valueStr: string) {
    if (isFunc(valueStr.trim())) return []
    return geneDepsAllowFunc(valueStr)
}


export function isFunc(str: string) {
    return /(^\(\)\s*?=>)|(function\s*?\(\))/.test(str.trim())
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