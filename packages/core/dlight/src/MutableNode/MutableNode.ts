import { DLNode } from "../DLNode"
import DLStore from "../DLStore"
import { type AnyDLNode } from "../types"

export class MutableNode extends DLNode {
  savedEnvNodes

  constructor(type: number) {
    super(type)
    if (DLStore.currentEnvNodes.length > 0) {
      this.savedEnvNodes = [...DLStore.currentEnvNodes]
    }
  }

  initNewNodes(nodes: AnyDLNode[]) {
    // ---- Add parentEl to all nodes
    DLNode.addParentEl(nodes, (this as AnyDLNode)._$parentEl)
  }

  geneNewNodesInEnv(newNodesFunc: () => AnyDLNode[]) {
    if (!this.savedEnvNodes) {
      const newNodes = newNodesFunc()
      this.initNewNodes(newNodes)
      return newNodes
    }
    const currentEnvNodes = DLStore.currentEnvNodes
    DLStore.replaceEnvNodes(this.savedEnvNodes)
    const newNodes = newNodesFunc()
    DLStore.replaceEnvNodes(currentEnvNodes)
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
    DLNode.loopDLNodes(nodes, node => {
      node.didUnmount?.()
    })
  }
}
