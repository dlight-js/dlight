import { CustomNode } from "../CustomNode";
import { EnvNode } from "../EnvNode";
import { HtmlNode } from "../HtmlNode";
import { DLNode, DLNodeType } from "../DLNode";
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, removeNodes } from "../utils";
import { MutableNode } from "./MutableNode";

interface ConditionPair {
    condition: () => boolean,
    node: () => DLNode[]
}

export class IfNode extends MutableNode {
    conditionPairs: ConditionPair[] = []
    condition?: string
    listenDeps: string[] = []
    dlScope?: CustomNode
    _$envNodes?: EnvNode[] = []

    constructor() {
        super(DLNodeType.If)
    }

    get _$el() {
        return this._$nodes.map(node => node._$el)
    }

    _$addCond(condition: () => boolean, node: () => DLNode[], dlScope?: CustomNode, listenDeps?: string[]) {
        this.conditionPairs.push({condition, node})
        if (listenDeps) {
            if (!this.dlScope) this.dlScope = dlScope
            this.listenDeps.push(...listenDeps)
        }
    }

    _$init() {
        // ---- 加if依赖
        // ---- 找到HTMLNode作为parentNode，因为它是有真实el的
        let parentNode: DLNode | undefined = this._$parentNode
        while (parentNode && parentNode._$nodeType !== DLNodeType.HTML) {
            parentNode = parentNode._$parentNode
        }
        
        if (parentNode) {
            const objectId = {}
            this._$depObjectIds.push(objectId)
            this.dlScope!._$addDeps(this.listenDeps, objectId, () => this.update(parentNode as HtmlNode))
        }

        // ---- 生成nodes
        // ---- 只要找到符合条件的就break
        let nodes: DLNode[] = []
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.condition()) {
                this.condition = conditionPair.condition.toString()
                nodes = conditionPair.node()
                break
            }
        }
        this._$nodes = nodes
        this._$bindNodes()
    }

    update(parentNode: HtmlNode) {
        const prevNodes = this._$nodes
        const condition = this.condition
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.condition()) {
                if (this.condition !== conditionPair.condition.toString()) {
                    // ---- 改变状态了，清除对应deps
                    this.condition = conditionPair.condition.toString()
                    this._$nodes = conditionPair.node()
                } else {
                    // ---- 和之前状态一样就直接不管
                }
                break
            }
        }

        if (this._$nodes === prevNodes) {
            // ---- 根本没变，就是没有匹配的，置空
            this._$nodes = []
        }

        if (prevNodes.length !== 0 && this._$nodes.length === 0) {
            // ---- 以前有，现在没有
            this.condition = "[none]"
        }
        if (condition === this.condition) return
        deleteNodesDeps(prevNodes, this.dlScope!)
        // ---- 原本有全删掉
        removeNodes(prevNodes)


        const flowIndex = getFlowIndexFromParentNode(parentNode, this)
        this._$bindNewNodes(this._$nodes)

        const parentEl = parentNode._$el
        appendNodesWithIndex(this._$nodes, flowIndex, parentEl, parentEl.childNodes.length)


        this.onUpdateNodes(prevNodes, this._$nodes)
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$nodes) {
            node.render(parentEl)
        }
    }
}