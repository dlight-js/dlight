import { addDeps } from "../utils/dep";
import {DLightNode} from "./DlightNode";
import { EnvNode } from "./EnvNode";
import { HtmlNode } from "./HtmlNode";
import { DLNode, DLNodeType } from "./DLNode";
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, removeNodes } from "./utils";

interface ConditionPair {
    condition: () => boolean,
    node: () => DLNode[]
}

export class IfNode extends DLNode {
    conditionPairs: ConditionPair[] = []
    condition?: string
    listenDeps: string[] = []
    dlScope?: DLightNode
    _$envNodes?: EnvNode[] = []

    constructor(id: string) {
        super(DLNodeType.If, id)
    }

    get _$el() {
        return this._$dlNodes.map(node => node._$el)
    }

    _$addCond(condition: () => boolean, node: () => DLNode[], dlScope?: DLightNode, listenDeps?: string[]) {
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
            addDeps(this.dlScope!, this.listenDeps, this._$id, () => this.update(parentNode as HtmlNode))
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
        this._$bindNodes(nodes)
    }

    update(parentNode: HtmlNode) {
        let nodes: DLNode[] = []
        const condition = this.condition
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.condition()) {
                if (this.condition !== conditionPair.condition.toString()) {
                    // ---- 改变状态了，清除对应deps
                    this.condition = conditionPair.condition.toString()
                    nodes = conditionPair.node()
                } else {
                    // ---- 和之前状态一样就直接不管
                    nodes = this._$dlNodes
                }
                break
            }
        }

        if (this._$nodes.length !== 0 && nodes.length === 0) {
            // ---- 以前有，现在没有
            this.condition = "[none]"
        }

        if (condition === this.condition) return
        deleteNodesDeps(this._$dlNodes, this.dlScope!)
        // ---- 原本有全删掉
        removeNodes(this._$dlNodes)


        const flowIndex = getFlowIndexFromParentNode(parentNode, this._$id)
        this._$bindNodes(nodes)

        const parentEl = parentNode._$el
        appendNodesWithIndex(this._$dlNodes, flowIndex, parentEl, parentEl.childNodes.length)
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
    }
}