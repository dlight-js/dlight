import {DLBase} from "./DLBase";
import { HTMLEl } from "./Els";

export function addDep(dl: DLBase, dep: string, id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    if (dl._$deps[dep] === undefined) {
        // ---- _$deps里面没有键，但是被监听到了，说明是derived
        //      valueFunc是空的就给他传一个derived出来的值，来判断相不相同
        addDerivedDeps(dl, dep, id, func, valueFunc)
        return
    }
    // ---- 需要传入生成的valueFunc和赋值或者其他操作的func，只有当新旧值不一样时才重新调用func
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

function addDerivedDeps(dl: DLBase, derivedDep: string, id: string, func: (newValue?: any) => any, valueFunc?: () => any) {
    // ---- 只是普通的class property
    if (dl._$derived_deps[derivedDep] === undefined) return
    let prevDerivedValue: any = undefined
    for (let dep of dl._$derived_deps[derivedDep]) {
        if (dl._$deps[dep] === undefined) {
            addDerivedDeps(dl, dep, id, func, valueFunc)
            return
        }
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
            depFunc = () => {
                if (prevDerivedValue !== (dl as any)[derivedDep]) {
                    func()
                    prevDerivedValue = (dl as any)[derivedDep]
                }
            }
        }
        if (dl._$deps[dep][id] === undefined) dl._$deps[dep][id] = []
        dl._$deps[dep][id].push(depFunc)
    }
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


export function isKeyDep(key: string, valueStr: string) {
    // ---- 后续可能用支持in browser的recast，https://github.com/benjamn/recast
    //      目前就字符串匹配 this.xxx  ([^\w$]|^)this.xxx([^\w$]|$)
    //      关联 ./decorator.ts
    return new RegExp(`([^\\w$]|^)this\\.${key}([^\\w$]|$)`).test(valueStr)
}

const depReg = /(?:[^\w$]|^)this\.(\w+)(?:[^\w$]|$)/g

// ---t 1000个比下面的快8ms
export function geneDeps(valueStr: string) {
    // ---- 依赖监听
    const listenDeps = []

    const matches = valueStr.matchAll(depReg)

    for (const match of matches) {
        listenDeps.push(match[1])
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

export function render(selectName: string, dl: DLBase) {
    const el = new HTMLEl(dl, "div", ()=>dl.render(), uid())
    el.el = document.querySelector(selectName)!
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