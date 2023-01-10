import {addDeps} from "../utils";
import {DLightNode} from "./DlightNode";
import { EnvNode } from "./EnvNode";
import { HtmlNode } from "./HtmlNode";
import { DLNode } from "./Node";
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, initNodes, parentNodes, removeNodes, resolveEnvs } from "./utils";

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
        super("if", id)
    }

    _$addCond(condition: () => boolean, node: () => DLNode[], dlScope?: DLightNode, listenDeps?: string[]) {
        this.conditionPairs.push({condition, node})
        if (listenDeps) {
            if (!this.dlScope) this.dlScope = dlScope
            this.listenDeps.push(...listenDeps)
        }
    }

    _$init() {
        for (let conditionPair of this.conditionPairs) {
            if (conditionPair.condition()) {
                this.condition = conditionPair.condition.toString()
                this._$nodes = conditionPair.node()
                break
            }
        }
        parentNodes(this._$dlNodes, this)
        resolveEnvs(this._$dlNodess, this)

        let parentNode: DLNode | undefined = this._$parentNode
        while (parentNode && parentNode._$nodeType !== "html") {
            parentNode = parentNode._$parentNode
        }
        
        if (!parentNode) return
        addDeps(this.dlScope!, this.listenDeps, this._$id, () => this.update(parentNode as HtmlNode))

        initNodes(this._$nodes)
    }

    render(parentEl: HTMLElement) {
        for (let node of this._$dlNodes) {
            node.render(parentEl)
        }
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
        this._$nodes = nodes
        parentNodes(this._$dlNodes, this)
        resolveEnvs(this._$dlNodes, this)
        initNodes(this._$dlNodes)

        const parentEl = parentNode._$el
        appendNodesWithIndex(this._$dlNodes, flowIndex, parentEl, parentEl.childNodes.length)
    }
}