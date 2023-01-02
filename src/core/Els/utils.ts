import {DLBase} from "../DLBase";
import {Indicator} from "./CustomEl";
import {deleteDeps} from "../utils";


// ---- removeEls
export function removeEls(els: any[], dl: DLBase) {
    for (let el of els) {
        if (Array.isArray(el)) {
            removeEls(el, dl)
            continue
        }
        if (el._$customEl) {
            removeEls(el.els, dl)
            continue
        }
        if (el._$plainEl) {
            el.el.remove()
            continue
        }
        const e = el.render()
        el.willUnmount()
        removeEls(e, dl)
        el.didUnmount()
    }
}

// ---- delete deps
export function deleteSubDeps(els: any[], dl: DLBase) {
    if (!els) return
    for (let el of els) {
        if (Array.isArray(el)) {
            deleteSubDeps(el, dl)
        }
        deleteDeps(dl, el.id)
        deleteSubDeps(el.els, dl)
        if (el.els) deleteSubDeps(el.els, dl)
    }
}



// ---- appendEls
export function appendEls(els: any[], index: number, parentEl: HTMLElement, length: number): [number, number] {
    for (let el of els) {
        if (Array.isArray(el)) {
            [index, length] = appendEls(el, index, parentEl, length)
            continue
        }
        if (el._$customEl) {
            [index, length] = appendEls(el.els, index, parentEl, length)
            continue
        }
        if (el._$plainEl) {
            if (index === length) {
                parentEl!.appendChild(el.el)
            } else {
                parentEl!.insertBefore(el.el, parentEl!.childNodes[index])
            }
            index ++
            length ++
            continue
        }
        const e = el.render()
        el.willMount();
        [index, length] = appendEls(e, index, parentEl, length)
        el.didMount()
    }
    return [index, length]
}


export function willMountEls(els: any[]) {
    for (let el of els) {
        if (Array.isArray(el)) {
            willMountEls(el)
            continue
        }
        if (el._$customEl) {
            willMountEls(el.els)
            continue
        }
        if (el._$plainEl) {
            continue
        }
        el.willMount();
        willMountEls(el.render())
    }
}

export function didMountEls(els: any[]) {
    for (let el of els) {
        if (Array.isArray(el)) {
            didMountEls(el)
            continue
        }
        if (el._$customEl) {
            didMountEls(el.els)
            continue
        }
        if (el._$plainEl) {
            continue
        }
        el.didMount();
        didMountEls(el.render())
    }
}

function resolveNestCustomElsTmp(els: any[], dl: DLBase, parentEl: HTMLElement, indicator: Indicator, funcName: string) {
    for (let el of els) {
        if (Array.isArray(el)) {
            resolveNestCustomElsTmp(el, dl, parentEl, indicator, funcName)
            continue
        }
        if (el._$customEl) {
            el[funcName](dl, parentEl, indicator)  // ---- init里面已经resolve了
            indicator.customEls.push(el)
            continue
        }
        if (el._$dlBase) {
            resolveNestCustomElsTmp(el.render(), dl, parentEl, indicator, funcName)
            indicator.index += el.render()
            continue
        }
        indicator.index ++
    }
}

export function resolveNestCustomEls(els: any[], dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
    resolveNestCustomElsTmp(els, dl, parentEl, indicator, "init")
}

export function resolveNestCustomElsAgain(els: any[], dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
    resolveNestCustomElsTmp(els, dl, parentEl, indicator, "reinit")
}

function getIndicatorIndex(customEls: any[]) {
    let index = 0
    for (let el of customEls) {
        if (Array.isArray(el)) {
            index += getIndicatorIndex(el)
            continue
        }
        if (el._$customEl) {
            index += getIndicatorIndex(el.els)
            continue
        }
        index += (el._$dlBase ? el.render() : [el]).length
    }
    return index
}

export function parseIndicator(indicator: Indicator) {
    return indicator.index + getIndicatorIndex(indicator.customEls)
}

export function newIndicator(indicator: Indicator) {
    return {
        index: indicator.index,
        customEls: [...indicator.customEls]
    }
}


export function flatElArray(el: any): HTMLElement[] {
    if (Array.isArray(el)) {
        const els = []
        for (let e of el) {
            els.push(...flatElArray(e))
        }
        return els
    }
    if (el._$customEl) return flatElArray(el.els)
    if (el._$plainEl) return [el.el]
    return flatElArray(el.render())
}


