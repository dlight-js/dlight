import { DLNode } from "./DLNode"

export class PropView {
  propViewFunc
  dlUpdateFunc = new Set()

  /**
   * @brief PropView constructor, accept a function that returns a list of DLNode
   * @param propViewFunc - A function that when called, collects and returns an array of DLNode instances
   */
  constructor(propViewFunc) {
    this.propViewFunc = propViewFunc
  }

  /**
   * @brief Build the prop view by calling the propViewFunc and add every single instance of the returned DLNode to dlUpdateNodes
   * @returns An array of DLNode instances returned by propViewFunc
   */
  build() {
    let update
    const addUpdate = updateFunc => {
      update = updateFunc
      this.dlUpdateFunc.add(updateFunc)
    }
    const newNodes = this.propViewFunc(addUpdate)
    if (newNodes.length === 0) return []
    if (update) {
      // Remove the updateNode from dlUpdateNodes when it unmounts
      DLNode.addWillUnmount(
        newNodes[0],
        this.dlUpdateFunc.delete.bind(this.dlUpdateFunc, update)
      )
    }

    return newNodes
  }

  /**
   * @brief Update every node in dlUpdateNodes
   * @param changed - A parameter indicating what changed to trigger the update
   */
  update(...args) {
    this.dlUpdateFunc.forEach(update => {
      update(...args)
    })
  }
}
