import { DLNode } from "./Node";
import {appendNodesWithIndex, deleteNodesDeps, removeNodes, getFlowIndexFromNodes, getFlowIndexFromParentNode, resolveEnvs, initNodes, parentNodes, replaceNodesWithFirstElement} from './utils';
import {addDeps} from '../utils';
import { DLightNode, hh } from "./DLightNode";
import { HtmlNode } from "./HtmlNode";
import { EnvNode } from "./EnvNode";


export class ForNode extends DLNode {
    keys: any[] = []
    array: any[] = []

    nodeFunc?: (item: DLNode, idx: number) => DLNode[]
    keyFunc?: () => any[]
    arrayFunc?: () => any[]
    dlScope?: DLightNode
    listenDeps?: string[]
    _$envNodes?: EnvNode[] = []
    constructor(id: string) {
        super("for", id)         
    }


    /**
     * @methodGroup - 只有有deps的时候才需要用各种func
     */
    _$addNodeFunc(nodeFunc: (item: DLNode, idx: number) => DLNode[]) {
        this.nodeFunc = nodeFunc
    }

    _$addKeyFunc(keyFunc: (() => any[])) {
        this.keyFunc = keyFunc
    }

    _$addArrayFunc(dlScope: DLightNode, arrayFunc: any | (() => any), listenDeps: string[]) {
        this.dlScope = dlScope
        this.arrayFunc = arrayFunc
        this.listenDeps = listenDeps
    }

    /**
     * @methodGroup - 无deps的时候直接加nodes
     */
    _$addNodesArr(nodess: DLNode[][]) {
        this._$nodes = nodess
    }
    _$addNodes(nodes: DLNode[]) {
        this._$dlNodess.push(nodes)
    }

    setArray() {
        this.array = [...this.arrayFunc!()]
    }

    setKeys() {
        if (!this.keyFunc) {
            return
        }
        const newKeys = [...this.keyFunc()]
        // ---- 没有重复
        if (newKeys.length === [...new Set(newKeys)].length) {
            this.keys = newKeys
            return
        } 

        // TODO 报错重复key
        // console.warm("重复key了")  
    }

    _$init() {
        if (!this.listenDeps) {
            parentNodes(this._$nodes, this)
            resolveEnvs(this._$nodes, this)
            initNodes(this._$nodes)
            return
        }
        // ---- 必须放在上面，不然按顺序run dep会导致初始化的删不掉
        const update = this.keyFunc
            ? () => this.updateWithKey(parentNode as HtmlNode)
            : () => this.updateWithOutKey(parentNode as HtmlNode)

        addDeps(this.dlScope!, this.listenDeps!, this._$id, update)

        this.setArray()
        this.setKeys()
        for (let [idx, item] of this.array.entries()) {
            this._$addNodes(this.nodeFunc!(item, idx))
        }
        parentNodes(this._$nodes, this)

        let parentNode: DLNode | undefined = this._$parentNode
        while (parentNode && parentNode._$nodeType !== "html") {
            parentNode = parentNode._$parentNode
        }
        
        if (!parentNode) return

        

        resolveEnvs(this._$nodes, this)
        initNodes(this._$nodes)
    }


    getNewNodes(idx: number) {
        const nodes = this.nodeFunc!(this.array[idx], idx)
        parentNodes(nodes, this)
        resolveEnvs(nodes, this)
        initNodes(nodes)
        return nodes
    }

    updateWithOutKey(parentNode: HtmlNode) {
        const parentEl = parentNode._$el
        const preLength = this.array.length

        this.setArray()
        const currLength = this.array.length

        if (preLength < currLength) {
            let newFlowIndex = getFlowIndexFromParentNode(parentNode, this._$id)
            let length = parentEl.childNodes.length  // 每次进去调用的话非常耗时
            for (let idx = 0; idx < currLength; idx++) {
                if (idx < preLength) {
                    newFlowIndex += getFlowIndexFromNodes(this._$dlNodess[idx])
                    continue
                }
                const newNodes = this.getNewNodes(idx);
                [newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)
                this._$dlNodess.push(newNodes)
            }
            return
        }

        for (let idx = currLength; idx < preLength; idx++) {
            deleteNodesDeps(this._$dlNodess[idx], this.dlScope!)
            removeNodes(this._$dlNodess[idx])
        }
        this._$nodes = this._$dlNodess.slice(0, currLength)
    }

    updateWithKey(parentNode: HtmlNode) {
        // ---- 如果提供了key，唯一目的就是为了保证element的reference不变，这样会变慢
        // TODO 还有待考虑
        const parentEl = parentNode._$el
        const flowIndex = getFlowIndexFromParentNode(parentNode, this._$id)
        const prevKeys = this.keys
        const prevArray = this.array
        const prevAllNodes = this._$dlNodess

        this.setArray()
        this.setKeys()

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
            // ---- 这里要逐个替换
            const prevNodes = prevArray[prevIdx]
            const replaceSucceed = replaceNodesWithFirstElement(prevAllNodes[prevIdx], prevNodes)
            if (!replaceSucceed) {
                // ---- 前面啥都没有，那就用for的index来append
                appendNodesWithIndex(prevNodes, flowIndex, parentEl, parentEl.childNodes.length)
            }

            // ---- 删除依赖
            deleteNodesDeps(prevAllNodes[prevIdx], this.dlScope!)
            // ---- 删除旧的
            removeNodes(prevAllNodes[prevIdx])
            // ---- 放回els里面
            this._$nodes[idx] = prevNodes
        }


        // ---2 再删除
        for (let prevIdx of [...Array(prevKeys.length).keys()]) {
            if (solvedPrevIdxes.includes(prevIdx)) continue
            deleteNodesDeps(prevAllNodes[prevIdx], this.dlScope!)
            removeNodes(prevAllNodes[prevIdx])
        }


        // ---3 再添加
        let newFlowIndex = flowIndex
        let length = parentEl.childNodes.length  // 每次进去调用的话非常耗时
        for (let idx of [...Array(this.keys.length).keys()]) {
            if (solvedIdx.includes(idx)) {
                // ---- 这些已经被替换了，但是要更新flowIndex的值
                newFlowIndex += getFlowIndexFromNodes(this._$dlNodess[idx])
                continue
            }
            const newNodes = this.getNewNodes(idx);
            [newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)

            this._$nodes[idx] = newNodes
        }

        this._$nodes = this._$dlNodess.slice(0, this.keys.length)
    }



    render(parentEl: HTMLElement) {
        for (let nodes of this._$dlNodess) {
            for (let node of nodes) {
                node.render(parentEl)
            }
        }
    }
}
