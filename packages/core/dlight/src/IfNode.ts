import { appendNodesWithSibling, getFlowIndexFromNodes, removeNodes } from "./flowIndex"
import { initNodes } from "./nodes"

export class IfNode {
  _$dlNodeType = "If"
  condFunc
  _$nodes

  constructor(condFunc: (thisIf: any) => any[]) {
    this.condFunc = condFunc

    this._$nodes = this.condFunc(this)
  }

  updateCond() {
    const newNodes = this.condFunc(this)
    if (!newNodes) return
    const parentEl = (this as any)._$parentEl
    initNodes(newNodes, parentEl)
    removeNodes(parentEl, this._$nodes)

    // ---- Add new nodes
    const flowIndex = getFlowIndexFromNodes(parentEl._$nodes, this)
    const nextSibling = parentEl._$nodes[flowIndex]
    appendNodesWithSibling(newNodes, parentEl, nextSibling)
    this._$nodes = newNodes
  }

  update(changed: number) {
    this._$nodes[0]._$updateFunc?.(changed)
  }

  _$init() {
    initNodes(this._$nodes, (this as any)._$parentEl)
  }
}