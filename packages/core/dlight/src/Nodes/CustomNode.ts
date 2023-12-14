import { DLNode, DLNodeType } from "./DLNode"
import { type ValueOrFunc, type AnyDLNode, type AnyValue } from "./type"
import { appendNodesWithIndex, getFlowIndexFromNodes, loopShallowDLNodes } from "./utils"

export class CustomNode extends DLNode {
  constructor() {
    super(DLNodeType.Custom)

  }

  /**
   * @brief Initialize the CustomNode
   */
  _$init(): void {
    ;(this as AnyDLNode).willMount?.call(this)
    const [nodes, update] = (this as AnyDLNode).Body?.call(this) ?? [[], () => {}]
    this._$nodes = nodes
    this._$update = update
    ;(this as AnyDLNode).didMount?.call(this)

    console.log("ye", this._$parentEl)

    if (this._$parentEl) {
      const insertIndex = getFlowIndexFromNodes(this._$parentEl._$nodes, this)
      console.log(insertIndex)
      appendNodesWithIndex(this._$nodes, this._$parentEl, insertIndex)
    }
  }

}
