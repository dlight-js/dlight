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
    specialEls: SpecialEl[]
}


export class SpecialEl {
    _$specialEl = true
    _$id: string
    _$els: any
    _$envEls: any[] = []

    dl: DLBase
    parentEl?: HTMLElement
    listenDeps: string[] = []
    indicator: Indicator = {
        index: 0,
        specialEls: []
    }

    constructor(id: string, dl: DLBase) {
        this._$id = id
        this.dl = dl
    }

    init(parentEl: HTMLElement, indicator: Indicator) {
        // ---- mount只是添加基础属性，不添加到dom上，添加dom在外面用appendEls()
        // ---- 首先preset一下
        this.indicator = newIndicator(indicator)
        this.parentEl = parentEl
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

    resolveNestCustomEls(els: any[], indicator: Indicator) {
        resolveNestCustomEls(els, this.parentEl!, indicator)
    }

    removeEls(els: any[]) {
        removeEls(els, this.dl)
    }

    deleteSubDeps(els: any[]) {
        deleteSubDeps(els, this.dl)
    }

    appendEls(els: any[], index: number, length: number) {
        return appendEls(els, index, this.parentEl!, length)
    }

    render(parentEl: HTMLElement, indicator: Indicator) {
        this.init(parentEl, indicator)
        this.appendEls(this._$els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }
}
