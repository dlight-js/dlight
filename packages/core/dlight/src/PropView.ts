import { DLNode, type AnyDLNode } from "./DLNode"

export class PropView {
  propViewFunc
  dlUpdateFunc = new Set<AnyDLNode>()

  /**
   * @brief PropView constructor, accept a function that returns a list of DLNode
   * @param propViewFunc
   */
  constructor(propViewFunc: (collector: any) => AnyDLNode[]) {
    this.propViewFunc = propViewFunc
  }

  /**
   * @brief Build the prop view by calling the propViewFunc and add every single instance of the returned DLNode to dlUpdateNodes
   * @returns the list of DLNode returned by propViewFunc
   */
  build(): AnyDLNode[] {
    let update
    const addUpdate = (updateFunc: (changed: number) => void) => {
      ;(updateFunc as any).initd = true
      update = updateFunc
      this.dlUpdateFunc.add(updateFunc)
    }
    const newNodes = this.propViewFunc(addUpdate)
    if (newNodes.length === 0) return []
    if (update) {
      console.log(newNodes)
      // ---- Remove the updateNode from dlUpdateNodes when it unmounts
      DLNode.addWillUnmount(
        newNodes[0],
        this.dlUpdateFunc.delete.bind(this.dlUpdateFunc, update)
      )
    }

    return newNodes
  }

  /**
   * @brief Update every node in dlUpdateNodes
   * @param changed
   */
  update(changed: number): void {
    this.dlUpdateFunc.forEach(update => {
      if (update.initd) {
        delete update.initd
        return
      }
      update(changed)
    })
  }
}
