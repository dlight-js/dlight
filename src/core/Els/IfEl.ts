import {DLBase} from "../DLBase";
import {SpecialEl, Indicator} from "./SpecialEl";
import {newIndicator, parseIndicator} from "./utils";
import {addDeps, geneDeps} from "../utils";

interface ConditionPair {
    cond: () => boolean,
    el: () => any
}


export class IfEl extends SpecialEl {
    conditionPairs: ConditionPair[]
    constructor(conditionPairs: ConditionPair[], id: string) {
        super(id)
        this.conditionPairs = conditionPairs
    }
    condition?: string


    init(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        // ---- mount只是添加基础属性，不添加到dom上，添加dom在外面用appendEls()
        // ---- 首先preset一下
        this.preset(dl, parentEl, indicator)
        // ---- init el
        let els = []
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.cond()) {
                this.condition = conditionPair.cond.toString()
                els = conditionPair.el()
                break
            }
        }
        this.els = els
        // ---- 拿到所有的监听依赖
        let listenDeps: string[] = []
        for (let conditionPair of this.conditionPairs) {
            listenDeps.push(...geneDeps(this.dl!, conditionPair.cond.toString()))
        }
        listenDeps = [...new Set(listenDeps)]
        // ---- 依赖更新
        addDeps(this.dl!, listenDeps, this._$id, () => this.update())

        this.resolveNestCustomEls(this.els, newIndicator(this.indicator))
    }

    // ---- update
    updateEl() {
        let els = []
        const condition = this.condition
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.cond()) {
                if (this.condition !== conditionPair.cond.toString()) {
                    // ---- 改变状态了，清除对应deps
                    this.condition = conditionPair.cond.toString()
                    els = conditionPair.el()
                } else {
                    // ---- 和之前状态一样就直接不管
                    els = this.els
                }
                break
            }
        }
        if (this.els.length !== 0 && els.length === 0) {
            // ---- 以前有，现在没有
            this.condition = "[none]"
        }

        return [els, condition === this.condition]
    }

    update() {
        const [els, didNotChange] = this.updateEl()
        if (didNotChange) return
        // ---- 先清理，再resolveNestIf，因为再resolveNestIf里面，
        //      要mount，是subIf第一次加依赖，顺序换了就永远是空了
        this.deleteSubDeps(this.els)
        // ---- 原本有全删掉
        this.removeEls(this.els)
        this.els = els
        this.resolveNestCustomEls(this.els, newIndicator(this.indicator))
        this.appendEls(this.els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }
}