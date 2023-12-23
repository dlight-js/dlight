import { type AnyDLNode } from "./DLNode"

export class PropView {
  propViewFunc
  dlUpdateNodes = new Set<AnyDLNode>()

  /**
   * @brief PropView constructor, accept a function that returns a list of DLNode
   * @param propViewFunc
   */
  constructor(propViewFunc: () => AnyDLNode[]) {
    this.propViewFunc = propViewFunc
  }

  /**
   * @brief Build the prop view by calling the propViewFunc and add every single instance of the returned DLNode to dlUpdateNodes
   * @returns the list of DLNode returned by propViewFunc
   */
  build(): AnyDLNode[] {
    const newNodes = this.propViewFunc()
    if (newNodes.length === 0) return []
    // ---- The update function is stored in the first node,
    //      so we push every instance of the first node to dlUpdateNodes
    const updateNode = newNodes[0]
    this.dlUpdateNodes.add(updateNode)
    // ---- Remove the updateNode from dlUpdateNodes when it unmounts
    const prevWillUnmount = updateNode.willUnmount
    updateNode.willUnmount = () => {
      this.dlUpdateNodes.delete(updateNode)
      prevWillUnmount?.()
    }

    return newNodes
  }

  /**
   * @brief Update every node in dlUpdateNodes
   * @param changed
   */
  update(changed: number): void {
    this.dlUpdateNodes.forEach(node => {
      node._$updateFunc?.(changed)
    })
  }
}
