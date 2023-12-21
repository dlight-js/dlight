import { DLNodeType } from "../DLNode"
import { type AnyDLNode } from "../types"
import { MutableNode } from "./MutableNode"

export class IfNode extends MutableNode {
  condFunc
  cond

  constructor(condFunc: (thisIf: IfNode) => AnyDLNode[]) {
    super(DLNodeType.If)
    this.condFunc = condFunc
    this.cond = -1
    this._$nodes = this.condFunc(this)
  }

  updateCond() {
    const newNodes = this.geneNewNodesInEnv(() => this.condFunc(this))
    // ---- If the new nodes are the same as the old nodes, we don't need to update
    if (!newNodes) return
    this.removeNodes(this._$nodes)
    if (this.cond === -1) {
      // ---- No branch has been taken
      this._$nodes = []
      return
    }


    // ---- Add new nodes
    const parentEl = (this as AnyDLNode)._$parentEl
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)
    const nextSibling = parentEl._$nodes[flowIndex]
    MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
    this._$nodes = newNodes
  }

  update(changed: number) {
    this._$nodes[0]?._$updateFunc?.(changed)
  }
}
