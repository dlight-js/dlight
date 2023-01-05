import {DLBase} from "../DLBase";
import { addDeps } from "../utils";

import {
    appendEls,
    deleteSubDeps, newIndicator, parseIndicator,
    removeEls,
    resolveNestCustomEls,
} from "./utils";


export interface Indicator {
    index: number
    customEls: SpecialEl[]
}


export class SpecialEl {
    dl?: DLBase
    parentEl?: HTMLElement
    _$id: string
    _$els: any
    _$specialEl = true
    listenDeps: string[] = []
    _$envEls: any[] = []
    indicator: Indicator = {
        index: 0,
        customEls: []
    }

    constructor(id: string) {
        this._$id = id
    }

    preset(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.dl = dl
        this.indicator = newIndicator(indicator)
        this.parentEl = parentEl
    }

    init(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        // ---- mount只是添加基础属性，不添加到dom上，添加dom在外面用appendEls()
        // ---- 首先preset一下
        this.preset(dl, parentEl, indicator)
        this.resolveNestCustomEls(this._$els, newIndicator(this.indicator))

        // ---- 依赖更新
        addDeps(this.dl!, this.listenDeps, this._$id, () => this.update())
    }

    update() {}

    resoleveEnvs(els: any[]) {
        for (let envEl of this._$envEls) {
            envEl.setEnvObjs(els)
        }
    }

    mount(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.init(dl, parentEl, indicator)
        this.appendEls(this._$els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }

    resolveNestCustomEls(els: any[], indicator: Indicator) {
        resolveNestCustomEls(els, this.dl!, this.parentEl!, indicator)
    }

    removeEls(els: any[]) {
        removeEls(els, this.dl!)
    }

    deleteSubDeps(els: any[]) {
        deleteSubDeps(els, this.dl!)
    }

    appendEls(els: any[], index: number, length: number) {
        return appendEls(els, index, this.parentEl!, length, this)
    }
}
