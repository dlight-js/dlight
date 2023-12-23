import { DLNode } from "../DLNode"
import { EnvStore } from "../EnvNode"
import { type AnyDLNode } from "../types"

export class MutableNode extends DLNode {
  savedEnvNodes

  constructor(type: number) {
    super(type)
    if (EnvStore.currentEnvNodes.length > 0) {
      this.savedEnvNodes = [...EnvStore.currentEnvNodes]
    }
  }

  initNewNodes(nodes: AnyDLNode[]) {
    // ---- Add parentEl to all nodes
    DLNode.addParentEl(nodes, (this as AnyDLNode)._$parentEl)
  }

  geneNewNodesInEnv(newNodesFunc: () => AnyDLNode[]) {
    if (!this.savedEnvNodes) {
      const newNodes = newNodesFunc()
      if (!newNodes) return
      this.initNewNodes(newNodes)
      return newNodes
    }
    const currentEnvNodes = EnvStore.currentEnvNodes
    EnvStore.replaceEnvNodes(this.savedEnvNodes)
    const newNodes = newNodesFunc()
    EnvStore.replaceEnvNodes(currentEnvNodes)
    if (!newNodes) return
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
