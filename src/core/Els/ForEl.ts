import { DLBase } from "../DLBase";
import {SpecialEl} from "./SpecialEl";
import {flatElArray, newIndicator, parseIndicator, willMountEls, didMountEls} from "./utils";


export class ForEl extends SpecialEl {
    elFunc: (item: any, idx: number) => any[]
    keyFunc: (() => any[]) | undefined
    arrayFunc: () => any
    keys: string[] = []
    array: any[] = []

    constructor(dl: DLBase, elFunc: (item: any, idx: number) => any[], keyFunc: (() => any[]) | undefined, arrayFunc: () => any, listenDeps: string[], id: string) {
        super(id, dl)
        this.elFunc = elFunc
        this.keyFunc = keyFunc
        this.arrayFunc = arrayFunc
        this.listenDeps = listenDeps
         // ---- init el
         this.array = this.getArray()
         this.keys = this.getKey()
         this._$els = this.array.map((item, idx)=>this.elFunc(item, idx))
    }


    getKey() {
        if (this.keyFunc) {
            const newKeys = [...this.keyFunc()]
            // ---- 没有重复
            if (newKeys.length === [...new Set(newKeys)].length) {
                return newKeys
            } 
            // TODO 报错重复key
            // console.warm("重复key了")  
        }        

        return [...Array(this.array.length).keys()]
    }

    getArray() {
        return [...this.arrayFunc()]
    }

    getNewEls(idx: number) {
        const newEls = this.elFunc(this.array[idx], idx)
        // ---- 先要初始化envs
        this.resoleveEnvs(newEls)
        return newEls
    }

    update() {
        const prevKeys = this.keys
        const prevArray = this.array
        const prevAllEls = this._$els
        this.array = this.getArray()
        this.keys = this.getKey() 
        // ---1 先替换
        const solvedIdx = []
        const solvedPrevIdxes: number[] = []

        let tt = 0
        let t1 = performance.now()
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
            const newEls = this.getNewEls(idx)

            if (firstEl === undefined) {
                // ---- 前面啥都没有，那就用for的index来append
                this.appendEls(newEls, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
            } else {
                // ---- 替换第一个
                willMountEls(newEls)
                let t1 = performance.now()
                let a = flatElArray(newEls)
                let t2 = performance.now()
                tt += t2-t1
                firstEl.replaceWith(...a)
                didMountEls(newEls)

            }

            // ---- 删除旧的
            this.deleteSubDeps(prevAllEls[prevIdx])
            this.removeEls(prevAllEls[prevIdx])
            // ---- 放回els里面
            this._$els[idx] = newEls
        }
        let t2 = performance.now()
        console.log(t2-t1)
        console.log(tt)
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
                // ---- 这些已经被替换了，但是要更新indicator的值
                this.resolveNestCustomEls(this._$els[idx], indicator)
                continue
            }
            const newEls = this.getNewEls(idx)
            const index = parseIndicator(indicator)
            this.resolveNestCustomEls(newEls, indicator);
            [_, length] = this.appendEls(newEls, index, length)

            this._$els[idx] = newEls
        }

        this._$els = this._$els.slice(0, this.keys.length)
    }

}