import { type AnyDLNode, DLNodeType } from "../DLNode"
import { MutableNode } from "./MutableNode"

export class IfNode extends MutableNode {
  condFunc
  cond
  depNum

  /**
   * @brief Constructor, If type, accept a function that returns a list of nodes
   * @param condFunc
   */
  constructor(condFunc: (thisIf: IfNode) => AnyDLNode[], depNum: number) {
    super(DLNodeType.If)
    this.condFunc = condFunc
    this.cond = -1
    this._$nodes = this.condFunc(this)
    this.depNum = depNum
  }

  /**
   * @brief Update the nodes in the environment
   */
  updateCond(): void {
    const newNodes = this.geneNewNodesInEnv(() => this.condFunc(this))
    // ---- If the new nodes are the same as the old nodes, we don't need to update
    if (!newNodes) return
    // ---- Remove old nodes
    this._$nodes && this.removeNodes(this._$nodes)
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
   * @brief The update function of IfNode's childNodes is stored in the first child node
   * @param changed
   */
  update(changed: number): void {
    if (changed === this.depNum) return
    this._$nodes![0]?._$updateFunc?.(changed)
  }
}
