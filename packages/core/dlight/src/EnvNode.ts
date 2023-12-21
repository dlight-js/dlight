import { DLNode, DLNodeType } from "./DLNode"
import { type AnyDLNode } from "./types"
import DLStore from "./DLStore"

export class EnvNode extends DLNode {
  updateNodes = new Set<AnyDLNode>()
  envs

  constructor(envs: Record<string, any>) {
    super(DLNodeType.Env)
    this.envs = envs
    DLStore.addEnvNode(this)
  }

  updateEnv(name: string, value: any) {
    this.envs[name] = value
    this.updateNodes.forEach(node => {
      node._$updateEnv(name, value, this)
    })
  }

  initNodes(nodes: AnyDLNode[]) {
    this._$nodes = nodes
    DLStore.removeEnvNode()
  }
}
