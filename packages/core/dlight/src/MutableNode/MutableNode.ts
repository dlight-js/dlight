import { type AnyDLNode, DLNode } from "../DLNode"
import { EnvStore } from "../EnvNode"

export class MutableNode extends DLNode {
  /**
   * @brief Mutable node is a node that this._$nodes can be changed, things need to pay attention:
   *  1. The environment of the new nodes should be the same as the old nodes
   *  2. The new nodes should be added to the parentEl
   *  3. The old nodes should be removed from the parentEl
   * @param type
   */
  constructor(type: number) {
    super(type)
    // ---- Save the current environment nodes, must be a new reference
    if (EnvStore.currentEnvNodes.length > 0) {
      ;(this as AnyDLNode).savedEnvNodes = [...EnvStore.currentEnvNodes]
    }
  }

  /**
   * @brief Initialize the new nodes, add parentEl to all nodes
   * @param nodes
   */
  private initNewNodes(nodes: AnyDLNode[]): void {
    // ---- Add parentEl to all nodes
    DLNode.addParentEl(nodes, (this as AnyDLNode)._$parentEl)
  }

  /**
   * @brief Generate new nodes in the saved environment
   * @param newNodesFunc
   * @returns
   */
  geneNewNodesInEnv(newNodesFunc: () => AnyDLNode[]): void | AnyDLNode[] {
    if (!(this as AnyDLNode).savedEnvNodes) {
      // ---- No saved environment, just generate new nodes
      const newNodes = newNodesFunc()
      // ---- Only for IfNode's same condition return
      if (!newNodes) return
      // ---- Initialize the new nodes
      this.initNewNodes(newNodes)
      return newNodes
    }
    // ---- Save the current environment nodes
    const currentEnvNodes = EnvStore.currentEnvNodes
    // ---- Replace the saved environment nodes
    EnvStore.replaceEnvNodes((this as AnyDLNode).savedEnvNodes)
    const newNodes = newNodesFunc()
    // ---- Retrieve the current environment nodes
    EnvStore.replaceEnvNodes(currentEnvNodes)
    // ---- Only for IfNode's same condition return
    if (!newNodes) return
    // ---- Initialize the new nodes
    this.initNewNodes(newNodes)
    return newNodes
  }

  removeNodes(nodes: any[]) {
    DLNode.loopDLNodes(nodes, node => {
      node.willUnmount?.()
    })
    DLNode.loopShallowEls(nodes, el => {
      this._$parentEl?.removeChild(el)
    })
    DLNode.loopDLNodesInsideOut(nodes, node => {
      node.didUnmount?.()
    })
  }
}
