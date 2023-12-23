import { type AnyDLNode, DLNode, DLNodeType } from "./DLNode"
import { type CompNode } from "./CompNode"

class EnvStoreClass {
  envs: Record<string, [any, AnyDLNode]> = {}
  currentEnvNodes: EnvNode[] = []
  /**
   * @brief Add a node to the current env and merge envs
   * @param node
   */
  addEnvNode(node: AnyDLNode): void {
    this.currentEnvNodes.push(node)
    this.mergeEnvs()
  }

  /**
   * @brief Replace the current env with the given nodes and merge envs
   * @param nodes
   */
  replaceEnvNodes(nodes: AnyDLNode[]): void {
    this.currentEnvNodes = nodes
    this.mergeEnvs()
  }

  /**
   * @brief Remove the last node from the current env and merge envs
   */
  removeEnvNode(): void {
    this.currentEnvNodes.pop()
    this.mergeEnvs()
  }

  /**
   * @brief Merge all the envs in currentEnvNodes, inner envs override outer envs
   */
  mergeEnvs(): void {
    this.envs = {}
    this.currentEnvNodes.forEach(envNode => {
      Object.entries(envNode.envs).forEach(([key, value]) => {
        this.envs[key] = [value, envNode]
      })
    })
  }
}

export const EnvStore = new EnvStoreClass()

export class EnvNode extends DLNode {
  updateNodes = new Set<CompNode>()
  envs

  /**
   * @brief Constructor, Env type, accept a record of envs, add this node to EnvStore
   * @param envs
   */
  constructor(envs: Record<string, any>) {
    super(DLNodeType.Env)
    // ---- Must set this.envs before calling EnvStore.addEnvNode,
    //      because EnvStore.addEnvNode will read this.envs and merge it with EnvStore.envs
    this.envs = envs
    EnvStore.addEnvNode(this)
  }

  /**
   * @brief Update a specific env, and update all the comp nodes that depend on this env
   * @param name
   * @param value
   */
  updateEnv(name: string, value: any): void {
    this.envs[name] = value
    this.updateNodes.forEach(node => {
      node._$updateEnv(name, value, this)
    })
  }

  /**
   * @brief Set this._$nodes, and exit the current env
   * @param nodes
   */
  initNodes(nodes: AnyDLNode[]): void {
    this._$nodes = nodes
    EnvStore.removeEnvNode()
  }
}
