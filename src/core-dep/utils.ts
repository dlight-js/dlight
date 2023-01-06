import {DLBase} from "./DLBase";
import { HTMLEl } from "./Els";

export function addDep(dl: DLBase, dep: string, id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    if (dl._$deps[dep] === undefined) return
    // ---- 需要传入生成的valueFunc和赋值或者其他操作的func，只有当新旧值不一样时才重新调用func
    //      如果不传入直接调用
    
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
    if (dl._$deps[dep][id] === undefined) dl._$deps[dep][id] = []
    dl._$deps[dep][id].push(depFunc)
}
export function addDeps(dl: DLBase, deps: string[], id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    for (let dep of deps) {
        addDep(dl, dep, id, func, valueFunc)
    }
}

export function deleteDeps(dl: DLBase, id: string) {
    for (let depName in dl._$deps) {
        delete dl._$deps[depName][id]
    }
}

export function deleteDepsPrefix(dl: DLBase, prefix: string) {
    for (let depName in dl._$deps) {
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

export function render(selectName: string, dl: DLBase) {
    const el = new HTMLEl(dl, "div", uid())
    el._$el = document.querySelector(selectName)!
    el._$addEls(dl.render())
    el.render()
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