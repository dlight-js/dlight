import { type AnyDLNode, DLNodeType } from "../DLNode"
import { MutableNode } from "./MutableNode"

export class CondNode extends MutableNode {
  condFunc
  cond
  depNum

  /**
   * @brief Constructor, If type, accept a function that returns a list of nodes
   * @param caseFunc
   */
  constructor(condFunc: (thisCond: CondNode) => AnyDLNode[], depNum: number) {
    super(DLNodeType.Cond)
    this.condFunc = condFunc
    this.depNum = depNum
    this.cond = -1
    this._$nodes = this.condFunc(this)
  }

  /**
   * @brief Update the nodes in the environment
   */
  updateCond(): void {
    const newNodes = this.geneNewNodesInEnv(() => this.condFunc(this))
    // ---- If the new nodes are the same as the old nodes, we only need to update  children
    if ((this as AnyDLNode).didntChange) {
      ;(this as AnyDLNode).didntChange = false
      return this.updateChildren()
    }

    // ---- Remove old nodes
    this._$nodes && this._$nodes.length > 0 && this.removeNodes(this._$nodes)
    if (this.cond === -1) {
      // ---- No branch has been taken
      this._$nodes = []
      return
    }
    // ---- Add new nodes
    const parentEl = (this as AnyDLNode)._$parentEl
    // ---- Faster append with nextSibling rather than flowIndex
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    const nextSibling = parentEl.childNodes[flowIndex]
    MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
    this._$nodes = newNodes
  }

  /**
   * @brief Update the children of IfNode
   */
  updateChildren(changed?: number): void {
    this._$nodes![0]?._$updateFunc?.(changed ?? this.depNum)
  }

  /**
   * @brief The update function of IfNode's childNodes is stored in the first child node
   * @param changed
   */
  update(changed: number): void {
    if (changed & this.depNum) return
    this.updateChildren(changed)
  }
}
