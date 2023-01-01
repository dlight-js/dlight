import {DLBase} from "../DLBase";
import {CustomEl, Indicator} from "./CustomEl";
import {flatElArray, newIndicator, parseIndicator} from "./utils";
import {addDeps, geneDeps} from "../utils";


export class ForEl extends CustomEl {
    elFunc: (item: any) => any[]
    keyFunc: () => any[]
    arrayFunc: () => any
    constructor(elFunc: (item: any) => any[], keyFunc: () => any[], arrayFunc: () => any) {
        super()
        this.elFunc = elFunc
        this.keyFunc = keyFunc
        this.arrayFunc = arrayFunc
    }
    keys: string[] = []
    array: any[] = []


    init(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.preset(dl, parentEl, indicator)
        // ---- init el
        this.keys = [...this.keyFunc()]
        this.array = [...this.arrayFunc()]
        this.els = this.array.map(item=>this.elFunc(item))
        // ---- add listen deps
        let listenDeps = geneDeps(this.dl!, this.arrayFunc.toString())
        addDeps(this.dl!, listenDeps, this.id, () => this.update())

        this.resolveNestCustomEls(this.els, newIndicator(this.indicator))
    }


    update() {
        // --nt
        const prevKeys = this.keys
        const prevArray = this.array
        const prevAllEls = this.els
        this.keys = [...this.keyFunc()]
        this.array = [...this.arrayFunc()]
        // ---1 先替换
        const solvedIdx = []
        const solvedPrevIdxes: number[] = []
        for (let [idx, key] of this.keys.entries()) {
            const prevIdx = prevKeys.indexOf(key)
            // ---- 如果前面没有这个key，代表是空的，直接继续不替换，下面处理
            if (prevIdx === -1) continue
            solvedIdx.push(idx)
            solvedPrevIdxes.push(prevIdx)
            // ---- 如果前面的item和现在的item相同，且index一样，直接继续
            if (prevArray[prevIdx] === this.array[idx] && idx === prevIdx) continue
            // ---- 不然就直接替换，把第一个替换了，其他的删除
            const firstEl = flatElArray(prevAllEls[prevIdx])[0]
            // ---- 添加新的
            const newEls = this.elFunc(this.array[idx])
            this.resolveNestCustomEls(newEls, {index: 0, customEls: []})  // 只是为了生成子els，所以indicator传啥无所谓，下面都会替换

            if (firstEl === undefined) {
                // ---- 前面啥都没有，那就用for的index来append
                this.appendEls(newEls, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
            } else {
                // ---- 替换第一个
                firstEl.replaceWith(...flatElArray(newEls))
            }
            // ---- 删除旧的
            this.deleteSubDeps(prevAllEls[prevIdx])
            this.removeEls(prevAllEls[prevIdx])
            // ---- 放回els里面
            this.els[idx] = newEls
        }
        // ---2 再删除
        for (let prevIdx of [...Array(prevKeys.length).keys()]) {
            if (solvedPrevIdxes.includes(prevIdx)) continue
            this.deleteSubDeps(prevAllEls[prevIdx])
            this.removeEls(prevAllEls[prevIdx])
        }
        // ---3 再添加
        const indicator = newIndicator(this.indicator)
        let length = this.parentEl!.childNodes.length  // 每次进去调用的话非常耗时
        // @ts-ignore
        let _: any
        for (let idx of [...Array(this.keys.length).keys()]) {
            if (solvedIdx.includes(idx)) {
                // ---- 这些已经被替换了
                // ---! 但是由于此idx前的element有改变，所以要reinit nest的情况
                this.resolveNestCustomElsAgain(this.els[idx], indicator)
                continue
            }
            const newEls = this.elFunc(this.array[idx])
            const index = parseIndicator(indicator)
            this.resolveNestCustomEls(newEls, indicator);
            [_, length] = this.appendEls(newEls, index, length)

            this.els[idx] = newEls
        }
    }

}