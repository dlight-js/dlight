import {DLBase} from './DLBase';

// ---- 后续可能用支持in browser的recast，https://github.com/benjamn/recast
//      目前就字符串匹配 this.xxx  ([^\w$]|^)this.xxx([^\w$]|$)
//      关联 ./decorator.ts  ./func.ts
export const propRegStr = (key: string) => `([^\\w$]|^)this\\.${key}([^\\w$]|$)`

export function createEl(tag: string) {
    return document.createElement(tag)
}

function geneDeps(dl: DLBase, valueStr: string) {
    // ---- 依赖监听
    const listenDeps = []

    // ---- 直接的监听，@State
    for (let stateKey of Object.keys(dl._$deps)) {
        if (new RegExp(propRegStr(stateKey)).test(valueStr)) {
            listenDeps.push(stateKey)
        }
    }

    // ---- 派生的监听，@Derived
    for (let derivedKey of Object.keys(dl._$derived_deps)) {
        if (new RegExp(propRegStr(derivedKey)).test(valueStr)) {
            listenDeps.push(...dl._$derived_deps[derivedKey])
        }
    }
    return listenDeps
}

function isFunc(str: string) {
    return /(^\(\)\s*?=>)|(function\s*?\(\))/.test(str.trim())
}

// @ts-ignore
export function addProp(dl: DLBase, el: HTMLElement, key: string, propFunc: () => any) {
    const listenDeps = geneDeps(dl, propFunc.toString())
    const func = () => eval(`el.${key} = propFunc()`)
    func()

    if (listenDeps.length === 0 || isFunc(propFunc.toString().slice(5))) {
        // ---1 没有依赖
        // ---2 value是function，如onClick之类的，本来就会监听变化，不用管
    } else {
        for (let dep of listenDeps) {
            if (dl._$deps[dep] === undefined) dl._$deps[dep] = []
            dl._$deps[dep].push(func)
        }
    }
}

export function addChildEls(el: HTMLElement, childEls: HTMLElement[]) {
    for (let childEl of childEls) {
        if (childEl === null) continue
        if (Array.isArray(childEl)) {
            for (let cEl of childEl) {
                el.appendChild(cEl)
            }
            continue
        }
        el.appendChild(childEl)
    }
}

export function listenChildEls(dl: DLBase, el: HTMLElement, conditions: (()=>any)[], addChildren: () => any) {
    const listenDeps: string[] = []
    for (let condition of conditions) {
        listenDeps.push(...geneDeps(dl, condition.toString()))
    }

    addChildEls(el, addChildren())
    if (listenDeps.length !== 0) {
        for (let dep of listenDeps) {
            if (dl._$deps[dep] === undefined) dl._$deps[dep] = []
            dl._$deps[dep].push(() => {
                el.innerHTML = ""
                addChildEls(el, addChildren())
            })
        }
    }
}

export function geneConditionDeps(dl: DLBase, conditionValues: string[]) {
    // ---- 依赖监听
    const listenDeps = []

    for (let valueStr of conditionValues) {
        listenDeps.push(...geneDeps(dl, valueStr))
    }

    return listenDeps
}


