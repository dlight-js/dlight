import { type AnyDLNode } from "./types"

class DLStoreClass {
  // ---- Envs
  currentEnvNodes: AnyDLNode[] = []
  addEnvNode(node: AnyDLNode) {
    this.currentEnvNodes.push(node)
    this.mergeEnvs()
  }

  replaceEnvNodes(nodes: AnyDLNode[]) {
    this.currentEnvNodes = nodes
    this.mergeEnvs()
  }

  removeEnvNode() {
    this.currentEnvNodes.pop()
    this.mergeEnvs()
  }

  envs: Record<string, [any, AnyDLNode]> = {}

  mergeEnvs() {
    this.envs = {}
    this.currentEnvNodes.forEach(envNode => {
      Object.entries(envNode.envs).forEach(([key, value]) => {
        this.envs[key] = [value, envNode]
      })
    })
  }
}

export default new DLStoreClass()
