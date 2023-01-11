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


// ---- 用在for里面
export function listen(dlScope: DLightNode, valueFunc: () => any, listenDeps: string[]) {
    const valueObj = { value: valueFunc() }

    const id = uid()
    addDeps(dlScope, listenDeps, id, () => {
        const value = valueFunc()
        // ---- 空了直接删除
        if (value === undefined) {
            deleteDeps(dlScope, id)
            return
        }
        valueObj.value = value
    })

    return valueObj
}

