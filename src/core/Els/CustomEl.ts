import {DLBase} from "../DLBase";

import {
    appendEls,
    deleteSubDeps, newIndicator, parseIndicator,
    removeEls,
    resolveNestCustomEls, resolveNestCustomElsAgain,
} from "./utils";
import {uid} from "../utils";


export interface Indicator {
    index: number
    customEls: CustomEl[]
}


export abstract class CustomEl {
    dl?: DLBase
    parentEl?: HTMLElement
    id: string = uid()
    els: any
    _$customEl = true
    indicator: Indicator = {
        index: 0,
        customEls: []
    }


    preset(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.dl = dl
        this.indicator = newIndicator(indicator)
        this.parentEl = parentEl
    }

    abstract init(dl: DLBase, parentEl: HTMLElement, indicator: Indicator): any
    reinit(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.preset(dl, parentEl, indicator)
        this.resolveNestCustomElsAgain(this.els, newIndicator(this.indicator))
    }
    mount(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.init(dl, parentEl, indicator)
        this.appendEls(this.els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }

    resolveNestCustomEls(els: any[], indicator: Indicator) {
        resolveNestCustomEls(els, this.dl!, this.parentEl!, indicator)
    }

    resolveNestCustomElsAgain(els: any[], indicator: Indicator) {
        resolveNestCustomElsAgain(els, this.dl!, this.parentEl!, indicator)
    }

    removeEls(els: any[]) {
        removeEls(els, this.dl!)
    }

    deleteSubDeps(els: any[]) {
        deleteSubDeps(els, this.dl!)
    }

    appendEls(els: any[], index: number, length: number) {
        return appendEls(els, index, this.parentEl!, length)
    }
}
