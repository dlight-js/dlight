import { DLBase } from "../DLBase";
import {SpecialEl} from "./SpecialEl";
import {newIndicator, parseIndicator} from "./utils";

interface ConditionPair {
    cond: () => boolean,
    el: () => any,
    deps: string[]
}


export class IfEl extends SpecialEl {
    conditionPairs: ConditionPair[] = []
    condition?: string

    constructor(dl: DLBase, conditionPairs: ConditionPair[], id: string) {
        super(id, dl)
        this.conditionPairs = conditionPairs
         // ---- init el
         let els = []
         for (let conditionPair of this.conditionPairs) {
             if (conditionPair.cond()) {
                 this.condition = conditionPair.cond.toString()
                 els = conditionPair.el()
                 break
             }
         }
         for (let conditionPair of this.conditionPairs) {
            this.listenDeps.push(...conditionPair.deps)
        }            
        this._$els = els
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
                    els = this._$els
                }
                break
            }
        }
        if (this._$els.length !== 0 && els.length === 0) {
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
        this.deleteSubDeps(this._$els)
        // ---- 原本有全删掉
        this.removeEls(this._$els)
        this._$els = els
        this.resoleveEnvs(this._$els)
        this.resolveNestCustomEls(this._$els, newIndicator(this.indicator))
        this.appendEls(this._$els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }
}