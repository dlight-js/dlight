import { DLNode } from "../DLNode"
import { DLStore } from "../store"

export class MutableNode extends DLNode {
  /**
   * @brief Mutable node is a node that this._$nodes can be changed, things need to pay attention:
   *  1. The environment of the new nodes should be the same as the old nodes
   *  2. The new nodes should be added to the parentEl
   *  3. The old nodes should be removed from the parentEl
   * @param type
   */
  constructor(type) {
    super(type)
    // ---- Save the current environment nodes, must be a new reference
    if (
      DLStore.global.DLEnvStore &&
      DLStore.global.DLEnvStore.currentEnvNodes.length > 0
    ) {
      this.savedEnvNodes = [...DLStore.global.DLEnvStore.currentEnvNodes]
    }
  }

  /**
   * @brief Initialize the new nodes, add parentEl to all nodes
   * @param nodes
   */
  initNewNodes(nodes) {
    // ---- Add parentEl to all nodes
    DLNode.addParentEl(nodes, this._$parentEl)
  }

  /**
   * @brief Generate new nodes in the saved environment
   * @param newNodesFunc
   * @returns
   */
  geneNewNodesInEnv(newNodesFunc) {
    if (!this.savedEnvNodes) {
      // ---- No saved environment, just generate new nodes
      const newNodes = newNodesFunc()
      // ---- Only for IfNode's same condition return
      // ---- Initialize the new nodes
      this.initNewNodes(newNodes)
      return newNodes
    }
    // ---- Save the current environment nodes
    const currentEnvNodes = DLStore.global.DLEnvStore.currentEnvNodes
    // ---- Replace the saved environment nodes
    DLStore.global.DLEnvStore.replaceEnvNodes(this.savedEnvNodes)
    const newNodes = newNodesFunc()
    // ---- Retrieve the current environment nodes
    DLStore.global.DLEnvStore.replaceEnvNodes(currentEnvNodes)
    // ---- Only for IfNode's same condition return
    // ---- Initialize the new nodes
    this.initNewNodes(newNodes)
    return newNodes
  }

  /**
   * @brief Remove nodes from parentEl and run willUnmount and didUnmount
   * @param nodes
   * @param removeEl Only remove outermost element
   */
  removeNodes(nodes, removeEl = true) {
    nodes.forEach(node => {
      node.willUnmount?.(node)
      if (!("_$dlNodeType" in node)) {
        if (removeEl) this._$parentEl?.removeChild(node)
        removeEl = false
      }
      this.removeNodes(node._$nodes ?? node.childNodes, removeEl)
      node.didUnmount?.(node)
    })
  }
}
