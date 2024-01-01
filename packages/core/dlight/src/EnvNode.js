import { DLNode } from "./DLNode"

class EnvStoreClass {
  constructor() {
    this.envs = {}
    this.currentEnvNodes = []
  }

  /**
   * @brief Add a node to the current env and merge envs
   * @param node - The node to add
   */
  addEnvNode(node) {
    this.currentEnvNodes.push(node)
    this.mergeEnvs()
  }

  /**
   * @brief Replace the current env with the given nodes and merge envs
   * @param nodes - The nodes to replace the current environment with
   */
  replaceEnvNodes(nodes) {
    this.currentEnvNodes = nodes
    this.mergeEnvs()
  }

  /**
   * @brief Remove the last node from the current env and merge envs
   */
  removeEnvNode() {
    this.currentEnvNodes.pop()
    this.mergeEnvs()
  }

  /**
   * @brief Merge all the envs in currentEnvNodes, inner envs override outer envs
   */
  mergeEnvs() {
    this.envs = {}
    this.currentEnvNodes.forEach(envNode => {
      Object.entries(envNode.envs).forEach(([key, value]) => {
        this.envs[key] = [value, envNode]
      })
    })
  }
}

// Declare a global variable in the window object
if (!window.DLEnvStore) window.DLEnvStore = new EnvStoreClass()

export class EnvNode extends DLNode {
  constructor(envs) {
    super(DLNode.DLNodeType.Env)
    this.envs = envs
    this.updateNodes = new Set()

    window.DLEnvStore.addEnvNode(this)
  }

  /**
   * @brief Update a specific env, and update all the comp nodes that depend on this env
   * @param name - The name of the environment variable to update
   * @param value - The new value of the environment variable
   */
  updateEnv(name, value) {
    this.envs[name] = value
    if (window.DLEnvStore.currentEnvNodes.includes(this)) {
      window.DLEnvStore.mergeEnvs()
    }
    this.updateNodes.forEach(node => {
      node._$updateEnv(name, value, this)
    })
  }

  /**
   * @brief Add a node to this.updateNodes, delete the node from this.updateNodes when it unmounts
   * @param node - The node to add
   */
  addNode(node) {
    this.updateNodes.add(node)
    DLNode.addWillUnmount(
      node,
      this.updateNodes.delete.bind(this.updateNodes, node)
    )
  }

  /**
   * @brief Set this._$nodes, and exit the current env
   * @param nodes - The nodes to set
   */
  initNodes(nodes) {
    this._$nodes = nodes
    window.DLEnvStore.removeEnvNode()
  }
}