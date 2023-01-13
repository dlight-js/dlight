import { DLNode } from "./Node";
import {appendNodesWithIndex, deleteNodesDeps, removeNodes, getFlowIndexFromNodes, getFlowIndexFromParentNode, resolveEnvs, initNodes, parentNodes, replaceNodesWithFirstElement} from './utils';
import {addDeps} from '../utils';
import { DLightNode, hh } from "./DLightNode";
import { HtmlNode } from "./HtmlNode";
import { EnvNode } from "./EnvNode";


export class ForNode extends DLNode {
    keys: any[] = []
    array: any[] = []

    nodeFunc?: (key: any, idx: number, forNode: any, updateIdx: number) => DLNode[]
    keyFunc?: () => any[]
    arrayFunc?: () => any[]
    dlScope?: DLightNode
    listenDeps?: string[]
    _$envNodes?: EnvNode[] = []
    constructor(id: string) {
        super("for", id)         
    }
    duplicatedOrNoKey = false
    updateIdx = 0

    get _$el() {
        return this._$dlNodess.reduce((arr, nodes) => {
            arr.push(...nodes.map(node=>node._$el))
            return arr
        }, [])
    }

    _$getItem(key: any, idx: number) {
        // ---- 重复key了就默认用index
        let index = this.duplicatedOrNoKey ? idx : this.keys.indexOf(key)
        return Array.from(this.array)[index]
    }
    /**
     * @methodGroup - 只有有deps的时候才需要用各种func
     */
    _$addNodeFunc(nodeFunc: (key: any, idx: number, forNode: any) => DLNode[]) {
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
            // // ---- 默认key，如果是object，就直接给他object作为唯一key，不然就给他index
            // if (this.array.length>0 && typeof this.array[0] === "object") {
            //     this.keys = [...this.array]
            //     return
            // }
            // this.keys = [...Array(this.array.length).keys()]
            this.duplicatedOrNoKey = true
            return
        }
        const newKeys = [...this.keyFunc()]
        // ---- 没有重复
        if (newKeys.length === [...new Set(newKeys)].length) {
            this.keys = newKeys
            return 
        } 
        this.keys = [...Array(this.array.length).keys()]

        // TODO 报错重复key
        console.warn("重复key了")  
        this.duplicatedOrNoKey = true
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

        addDeps(this.dlScope!, this.listenDeps!, this._$id, () => {
            this.updateIdx ++
            update()
        })

        this.setArray()
        this.setKeys()
        if (this.duplicatedOrNoKey) {
            for (let idx of this.array.keys()) {
                this._$addNodes(this.nodeFunc!(null, idx, this, this.updateIdx))
            }
        } else {
            for (let [idx, key] of this.keys.entries()) {
                this._$addNodes(this.nodeFunc!(key, idx, this, this.updateIdx))
            }
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


    getNewNodes(key: any, idx: number) {
        const nodes = this.nodeFunc!(key, idx, this, this.updateIdx)
        parentNodes(nodes, this)
        resolveEnvs(nodes, this)
        initNodes(nodes)
        return nodes
    }

    /**
     * 没有key这样是优化过的，非常快 
     */
    updateWithOutKey(parentNode: HtmlNode) {
        const parentEl = parentNode._$el
        const preLength = this.array.length

        this.setArray()
        const currLength = this.array.length

        if (preLength === currLength) return
        if (preLength < currLength) {
            let newFlowIndex = getFlowIndexFromParentNode(parentNode, this._$id)
            let length = parentEl.childNodes.length  // 每次进去调用的话非常耗时
            for (let idx = 0; idx < currLength; idx++) {
                if (idx < preLength) {
                    newFlowIndex += getFlowIndexFromNodes(this._$dlNodess[idx])
                    continue
                }
                const newNodes = this.getNewNodes(null, idx);
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
        const parentEl = parentNode._$el
        const flowIndex = getFlowIndexFromParentNode(parentNode, this._$id)
        let prevKeys = this.keys
        const prevArray = [...this.array]
        const prevAllNodes = [...this._$dlNodess]

        this.setArray()
        this.setKeys()
        if (this.duplicatedOrNoKey) prevKeys = [...Array(prevArray.length).keys()]

        const deletedIdx = []
        // ---1 先删除，原来有现在没有的key
        for (let [prevIdx, prevKey] of prevKeys.entries()) {
            if (this.keys.includes(prevKey)) continue
            deleteNodesDeps(prevAllNodes[prevIdx], this.dlScope!)
            removeNodes(prevAllNodes[prevIdx])
            // ---- 删了原来的key那个位置也要删除
            deletedIdx.push(prevIdx)
        }
        let newPrevKeys = []
        const newDlNodes = []
        for (let idx of prevKeys.keys()) {
            if (deletedIdx.includes(idx)) continue
            newPrevKeys.push(prevKeys[idx])
            newDlNodes.push(this._$dlNodess[idx])
        }
        prevKeys = newPrevKeys

        // ---3 再添加
        let newFlowIndex = flowIndex
        newPrevKeys = []
        const addedIdx = []
        const newNodess = []
        let length = parentEl.childNodes.length  // 每次进去调用的话非常耗时
        for (let [idx, key] of this.keys.entries()) {
            if (prevKeys.includes(key)) {
                // ---- 这些已经被替换了，但是要更新flowIndex的值
                newFlowIndex += getFlowIndexFromNodes(this._$dlNodess[idx])
                continue
            }
            const newNodes = this.getNewNodes(key, idx);
            [newFlowIndex, length] = appendNodesWithIndex(newNodes, newFlowIndex, parentEl, length)
            addedIdx.push(idx)
            newNodess.push(newNodes)
            newPrevKeys.push(key)
        }

        for (let [i, idx] of addedIdx.entries()) {
            newDlNodes.splice(idx, 0, newNodess[i])
            prevKeys.splice(idx, 0, newPrevKeys[i])
        }

        

        // ---3 再替换

        for (let [idx, key] of this.keys.entries()) {
            const prevIdx = prevKeys.indexOf(key)
            // ---- 如果前面没有这个key，代表是空的，直接继续不替换，下面处理
            if (prevIdx === -1) continue
            // ---- 如果前面的item和现在的item index一样，直接继续
            if (idx === prevIdx) continue

            // ---- 不然就直接替换，把第一个替换了，其他的删除
            // ---- 这里要逐个替换
            const prevNodes = prevArray[prevIdx]
            const replaceSucceed = replaceNodesWithFirstElement(prevAllNodes[prevIdx], prevNodes)
            if (!replaceSucceed) {
                // ---- 前面啥都没有，那就用for的index来append
                appendNodesWithIndex(prevNodes, flowIndex, parentEl, parentEl.childNodes.length)
            }

            // ---- 只是替换 不要删除依赖
            // ---- 删除旧的
            removeNodes(prevAllNodes[prevIdx])
            // ---- 放回els里面
            newDlNodes[idx] = prevNodes
        }

        this._$nodes = newDlNodes

    }



    render(parentEl: HTMLElement) {
        for (let nodes of this._$dlNodess) {
            for (let node of nodes) {
                node.render(parentEl)
            }
        }
    }
}
