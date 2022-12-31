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
    //      关联 ./decorator.ts && genDeps()
    return new RegExp(`([^\\w$]|^)this\\.${key}([^\\w$]|$)`).test(valueStr)
}

export function geneDeps(dl: DLBase, valueStr: string) {
    // ---- 依赖监听
    const listenDeps = []

    // ---- 直接的监听，@State
    for (let stateKey of Object.keys(dl._$deps)) {
        if (isKeyDep(stateKey, valueStr)) {
            listenDeps.push(stateKey)
        }
    }
    // ---- 派生的监听，@Derived
    for (let derivedKey of Object.keys(dl._$derived_deps)) {
        if (isKeyDep(derivedKey, valueStr)) {
            listenDeps.push(...dl._$derived_deps[derivedKey])
        }
    }
    return listenDeps
}

export function isFunc(str: string) {
    return /(^\(\)\s*?=>)|(function\s*?\(\))/.test(str.trim())
}

export function render(id: string, dl: DLBase) {
    const el = document.getElementById(id)!
    addEls(dl, el, dl.render())
}

export function uid() {
    let d = new Date().getTime();  //Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;  //random number between 0 and 16
        if (d > 0) {  //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {  //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    })
}

export function runDeps(dl: DLBase, depName: string) {
    for (let id in dl._$deps[depName] ?? []) {
        for (let dep of dl._$deps[depName][id]) {
            dep.call(dl)
        }
    }
}