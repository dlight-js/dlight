import {DLBase} from "../DLBase";
import {Indicator} from "./SpecialEl";
import {deleteDeps} from "../utils";


// ---- removeEls
export function removeEls(els: any[], dl: DLBase) {
    for (let el of els) {
        if (Array.isArray(el)) {
            removeEls(el, dl)
            continue
        }
        if (el._$specialEl) {
            removeEls(el._$els, dl)
            continue
        }
        if (el._$htmlEl || el._$textEl) {
            el._$el.remove()
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
    for (let el of els) {
        if (Array.isArray(el)) {
            deleteSubDeps(el, dl)
        }
        if (el._$id) deleteDeps(dl, el._$id)
        if (el._$depIds) {
            for (let i of el._$depIds) {
                deleteDeps(dl, i)
            }
        }
        if (el._$els) deleteSubDeps(el._$els, dl)
    }
}



// ---- appendEls
export function appendEls(els: any[], index: number, parentEl: HTMLElement, length: number): [number, number] {
    for (let el of els) {
        if (Array.isArray(el)) {
            [index, length] = appendEls(el, index, parentEl, length)  // 只可能是for，所以fatherEl还是fatherEl
            continue
        }
        if (el._$specialEl) {
            [index, length] = appendEls(el._$els, index, parentEl, length)
            continue
        }
        if (el._$textEl || el._$htmlEl) {
            if (el._$htmlEl) el.render()
            if (index === length) {
                parentEl!.appendChild(el._$el)
            } else {
                parentEl!.insertBefore(el._$el, parentEl!.childNodes[index])
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
        if (el._$specialEl) {
            willMountEls(el._$els)
            continue
        }
        if (el._$textEl || el._$htmlEl) {
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
        if (el._$specialEl) {
            didMountEls(el._$els)
            continue
        }
        if (el._$textEl || el._$htmlEl) {
            continue
        }
        el.didMount();
        didMountEls(el.render())
    }
}

export function resolveNestCustomEls(els: any[], parentEl: HTMLElement, indicator: Indicator) {
    for (let el of els) {
        if (Array.isArray(el)) {
            resolveNestCustomEls(el, parentEl, indicator)
            continue
        }
        if (el._$specialEl) {
            el.init(parentEl, indicator)  // ---- init里面已经resolve了
            indicator.specialEls.push(el)
            continue
        }
        if (el._$dlBase) {
            resolveNestCustomEls(el.render(), parentEl, indicator)
            indicator.index += el.render()
            continue
        }
        indicator.index ++
    }
}


function getIndicatorIndex(specialEls: any[]) {
    let index = 0
    for (let el of specialEls) {
        if (Array.isArray(el)) {
            index += getIndicatorIndex(el)
            continue
        }
        if (el._$specialEl) {
            index += getIndicatorIndex(el._$els)
            continue
        }
        index += (el._$dlBase ? el.render() : [el]).length
    }
    return index
}

export function parseIndicator(indicator: Indicator) {
    return indicator.index + getIndicatorIndex(indicator.specialEls)
}

export function newIndicator(indicator: Indicator) {
    return {
        index: indicator.index,
        specialEls: [...indicator.specialEls]
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
    if (el._$specialEl) return flatElArray(el._$els)
    if (el._$htmlEl || el._$textEl) {
        if (el._$htmlEl) el.render()
        return [el._$el]
    }
    return flatElArray(el.render())
}


