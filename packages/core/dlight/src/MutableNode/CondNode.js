import { DLNodeType } from "../DLNode"
import { MutableNode } from "./MutableNode"

export class CondNode extends MutableNode {
  condFunc
  cond
  depNum

  /**
   * @brief Constructor, If type, accept a function that returns a list of nodes
   * @param caseFunc
   */
  constructor(depNum) {
    super(DLNodeType.Cond)
    this.depNum = depNum
  }

  addCondFunc(condFunc) {
    this.cond = -1
    this.condFunc = condFunc
    this._$nodes = this.condFunc(this)
  }

  /**
   * @brief Update the nodes in the environment
   */
  updateCond() {
    const newNodes = this.geneNewNodesInEnv(() => this.condFunc(this))
    // ---- If the new nodes are the same as the old nodes, we only need to update  children
    if (this.didntChange) {
      this.didntChange = false
      this.updateFunc?.(this.depNum)
      return this._$nodes
    }

    // ---- Remove old nodes
    this._$nodes && this._$nodes.length > 0 && this.removeNodes(this._$nodes)
    if (newNodes.length === 0) {
      // ---- No branch has been taken
      this._$nodes = []
      return this._$nodes
    }
    // ---- Add new nodes
    const parentEl = this._$parentEl
    // ---- Faster append with nextSibling rather than flowIndex
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    const nextSibling = parentEl.childNodes[flowIndex]
    MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
    MutableNode.runDidMount()
    this._$nodes = newNodes

    return this._$nodes
  }

  /**
   * @brief The update function of IfNode's childNodes is stored in the first child node
   * @param changed
   */
  update(changed) {
    if (changed & this.depNum) return
    this.updateFunc?.(changed)
  }
}
