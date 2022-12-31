// ---- geneIndex
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
            const id = innerEl.dataset.depId
            if (id) {
                console.log(dl._$deps)
                deleteDeps(dl, id)
                console.log(dl._$deps)
            }
            innerEl.remove()
        }
        if (el._$dlBase) el.didUnmount()
    }
}



// ---- appendEls
export function appendEls(els: any[], index: number, parentEl: HTMLElement) {
    for (let el of els) {
        if (Array.isArray(el)) {
            index = appendEls(el, index, parentEl)
            continue
        }
        if (el._$customEl) {
            index = appendEls(el.els, index, parentEl)
            continue
        }
        const innerEls = el._$dlBase ? el.render() : [el]
        if (el._$dlBase) el.willMount()
        for (let innerEl of innerEls) {
            if (index === parentEl!.childNodes.length) {
                parentEl!.appendChild(innerEl)
                index ++
            } else if (index < parentEl!.childNodes.length) {
                parentEl!.insertBefore(innerEl, parentEl!.childNodes[index])
                index ++
            }
        }
        if (el._$dlBase) el.didMount()
    }
    return index
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


