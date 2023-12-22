import { type AnyDLNode } from "./types"

export class PropView {
  _$propView: any
  propViewFunc

  constructor(propViewFunc: () => AnyDLNode[]) {
    this.propViewFunc = propViewFunc
  }

  dlUpdateNodes = new Set<AnyDLNode>()

  build() {
    const newNodes = this.propViewFunc()
    if (newNodes.length === 0) return []
    const updateNode = newNodes[0]
    this.dlUpdateNodes.add(updateNode)
    const prevWillUnmount = updateNode.willUnmount
    updateNode.willUnmount = () => {
      this.dlUpdateNodes.delete(updateNode)
      prevWillUnmount?.()
    }

    return newNodes
  }

  update(changed: number) {
    this.dlUpdateNodes.forEach(node => {
      node._$updateFunc?.(changed)
    })
  }
}
