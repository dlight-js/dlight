import { DLNodeType } from "../DLNode"
import { FlatNode } from "./FlatNode"
import { DLStore, cached } from "../store"

export class ExpNode extends FlatNode {
  /**
   * @brief Constructor, Exp type, accept a function that returns a list of nodes
   * @param nodesFunc
   */
  constructor(value, deps) {
    super(DLNodeType.Exp)
    this.initUnmountStore()
    this._$nodes = ExpNode.formatNodes(value)
    this.setUnmountFuncs()
    this.deps = this.parseDeps(deps)
    // ---- Add to the global UnmountStore
    ExpNode.addWillUnmount(this, this.runWillUnmount.bind(this))
    ExpNode.addDidUnmount(this, this.runDidUnmount.bind(this))
  }

  parseDeps(deps) {
    return deps.map(dep => (dep.prototype._$init ? dep.toString() : dep))
  }

  cache(deps) {
    if (!deps || !deps.length) return false
    deps = this.parseDeps(deps)
    if (cached(deps, this.deps)) return true
    this.deps = deps
    return false
  }
  /**
   * @brief Generate new nodes and replace the old nodes
   */
  update(valueFunc, deps) {
    if (this.cache(deps)) return
    this.removeNodes(this._$nodes)
    const newNodes = this.geneNewNodesInEnv(() =>
      ExpNode.formatNodes(valueFunc())
    )
    if (newNodes.length === 0) {
      this._$nodes = []
      return
    }

    // ---- Add new nodes
    const parentEl = this._$parentEl
    const flowIndex = ExpNode.getFlowIndexFromNodes(parentEl._$nodes, this)
    const nextSibling = parentEl.childNodes[flowIndex]
    ExpNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)
    ExpNode.runDidMount()

    this._$nodes = newNodes
  }

  /**
   * @brief Format the nodes
   * @param nodes
   * @returns New nodes
   */
  static formatNodes(nodes) {
    if (!Array.isArray(nodes)) nodes = [nodes]
    return (
      nodes
        // ---- Flatten the nodes
        .flat(1)
        // ---- Filter out empty nodes
        .filter(
          node =>
            node !== undefined && node !== null && typeof node !== "boolean"
        )
        .map(node => {
          // ---- If the node is a string, number or bigint, convert it to a text node
          if (
            typeof node === "string" ||
            typeof node === "number" ||
            typeof node === "bigint"
          ) {
            return DLStore.document.createTextNode(`${node}`)
          }
          // ---- If the node has PropView, call it to get the view
          if ("propViewFunc" in node) return node.build()
          return node
        })
        // ---- Flatten the nodes again
        .flat(1)
    )
  }
}
