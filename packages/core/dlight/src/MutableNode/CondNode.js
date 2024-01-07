import { DLNodeType } from "../DLNode"
import { FlatNode } from "./FlatNode"

export class CondNode extends FlatNode {
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
    this.initUnmountStore()
    this._$nodes = this.condFunc(this)
    this.setUnmountFuncs()

    // ---- Add to the global UnmountStore
    CondNode.addWillUnmount(this, this.runWillUnmount.bind(this))
    CondNode.addDidUnmount(this, this.runDidUnmount.bind(this))
  }

  /**
   * @brief Update the nodes in the environment
   */
  updateCond(...args) {
    // ---- Need to save prev unmount funcs because we can't put removeNodes before geneNewNodesInEnv
    //      The reason is that if it didn't change, we don't need to unmount or remove the nodes
    const prevFuncs = [this.willUnmountFuncs, this.didUnmountFuncs]
    const newNodes = this.geneNewNodesInEnv(() => this.condFunc(this))

    // ---- If the new nodes are the same as the old nodes, we only need to update  children
    if (this.didntChange) {
      ;[this.willUnmountFuncs, this.didUnmountFuncs] = prevFuncs
      this.didntChange = false
      this.updateFunc?.(this.depNum, ...args)
      return this._$nodes
    }
    // ---- Remove old nodes
    const newFuncs = [this.willUnmountFuncs, this.didUnmountFuncs]
    ;[this.willUnmountFuncs, this.didUnmountFuncs] = prevFuncs
    this._$nodes && this._$nodes.length > 0 && this.removeNodes(this._$nodes)
    ;[this.willUnmountFuncs, this.didUnmountFuncs] = newFuncs

    if (newNodes.length === 0) {
      // ---- No branch has been taken
      this._$nodes = []
      return this._$nodes
    }
    // ---- Add new nodes
    const parentEl = this._$parentEl
    // ---- Faster append with nextSibling rather than flowIndex
    const flowIndex = CondNode.getFlowIndexFromNodes(parentEl._$nodes, this)

    const nextSibling = parentEl.childNodes[flowIndex]
    CondNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
    CondNode.runDidMount()
    this._$nodes = newNodes

    return this._$nodes
  }

  /**
   * @brief The update function of IfNode's childNodes is stored in the first child node
   * @param changed
   */
  update(changed, ...args) {
    if (changed & this.depNum) return
    this.updateFunc?.(changed, ...args)
  }
}
