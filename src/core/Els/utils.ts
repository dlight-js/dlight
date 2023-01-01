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
        const innerEls = el._$dlBase ? el.render() : [el]
        if (el._$dlBase) el.willUnmount()
        for (let innerEl of innerEls) {
            removeElDeps(innerEl, dl)
            innerEl.remove()
        }
        if (el._$dlBase) el.didUnmount()
    }
}

function removeElDeps(el: HTMLElement, dl: DLBase) {
    if (el.dataset.depId) deleteDeps(dl, el.dataset.depId)
    for (let childEl of Array.from(el.children)) {
        removeElDeps(childEl as HTMLElement, dl)
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
        const innerEls = el._$dlBase ? el.render() : [el]
        if (el._$dlBase) el.willMount()
        for (let innerEl of innerEls) {
            if (index === length) {
                parentEl!.appendChild(innerEl)
            } else {
                parentEl!.insertBefore(innerEl, parentEl!.children[index])
            }
            index ++
            length ++
        }
        if (el._$dlBase) el.didMount()
    }
    return [index, length]
}

// ---- delete deps
export function deleteSubDeps(els: any[], dl: DLBase) {
    for (let el of els) {
        if (Array.isArray(el)) {
            deleteSubDeps(el, dl)
        }
        if (el._$customEl) {
            deleteDeps(dl, el.id)
            deleteSubDeps(el.els, dl)
        }
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
    return el._$dlBase ? el.render() : [el]
}


