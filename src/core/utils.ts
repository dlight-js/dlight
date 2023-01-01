import {DLBase} from "./DLBase";
import {addEls} from "./func";

export function addDep(dl: DLBase, dep: string, id: string, func: ()=>any) {
    if (dl._$deps[dep] === undefined) dl._$deps[dep] = []
    if (dl._$deps[dep][id] === undefined) dl._$deps[dep][id] = []
    dl._$deps[dep][id].push(func)
}

export function addDeps(dl: DLBase, deps: string[], id: string, func: ()=>any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func)
    }
}

export function deleteDeps(dl: DLBase, id: string) {
    if (!id) return
    for (let depName in dl._$deps) {
        delete dl._$deps[depName][id]
    }
}


export function isKeyDep(key: string, valueStr: string) {
    // ---- 后续可能用支持in browser的recast，https://github.com/benjamn/recast
    //      目前就字符串匹配 this.xxx  ([^\w$]|^)this.xxx([^\w$]|$)
    //      关联 ./decorator.ts
    return new RegExp(`([^\\w$]|^)this\\.${key}([^\\w$]|$)`).test(valueStr)
}

const depReg = /(?:[^\w$]|^)this\.(\w+)(?:[^\w$]|$)/g

// ---t 1000个比下面的快8ms
export function geneDeps(dl: DLBase, valueStr: string) {
    // ---- 依赖监听
    const listenDeps = []
    const depKeys = Object.keys(dl._$deps)
    const derivedKeys = Object.keys(dl._$derived_deps)

    const matches = valueStr.matchAll(depReg)

    for (const match of matches) {
        const depName = match[1]
        if (depKeys.includes(depName)) {
            listenDeps.push(depName)
            continue
        }
        if (derivedKeys.includes(depName)) {
            listenDeps.push(...dl._$derived_deps[depName])
        }
    }

    return [...new Set(listenDeps)]
}
// export function geneDeps(dl: DLBase, valueStr: string) {
//     // ---- 依赖监听
//     const listenDeps = []
//
//     // ---- 直接的监听，@State
//     for (let stateKey of Object.keys(dl._$deps)) {
//         if (isKeyDep(stateKey, valueStr)) {
//             listenDeps.push(stateKey)
//         }
//     }
//     // ---- 派生的监听，@Derived
//     for (let derivedKey of Object.keys(dl._$derived_deps)) {
//         if (isKeyDep(derivedKey, valueStr)) {
//             listenDeps.push(...dl._$derived_deps[derivedKey])
//         }
//     }
//     return listenDeps
// }


export function isFunc(str: string) {
    return /(^\(\)\s*?=>)|(function\s*?\(\))/.test(str.trim())
}

export function render(id: string, dl: DLBase) {
    const el = document.getElementById(id)!
    addEls(dl, el, dl.render())
}

// ---- 比下面生成uuid省很多时间（1000个省3ms），但是有可能重复（36^13=1.6^20的概率)，trade off了
export function uid() {
    return Math.random().toString(20).slice(2)
}

// export function uid() {
//     return uuid.v4()
// }

export function runDeps(dl: DLBase, depName: string) {
    for (let id in dl._$deps[depName] ?? []) {
        for (let dep of dl._$deps[depName][id]) {
            dep.call(dl)
        }
    }
}