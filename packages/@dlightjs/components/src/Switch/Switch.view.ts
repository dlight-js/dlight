import { type DLNode, View } from "@dlightjs/dlight"
import Types, { Prop, required, _ } from "@dlightjs/types"

interface SwitchProps {
  _$content: any
}

class Switch extends View {
  @Prop _$content = required

  caseChildren = (function() {
    const targetNodes: DLNode[] = []
    for (const child of this._$children) {
      if (!child.iAmCase) {
        targetNodes.push(child)
        continue
      }
      if (this._$content === child._$content ||
                child._$content === " default") {
        targetNodes.push(...child._$children)
        break
      }
    }
    return targetNodes
  }.call(this))

  Body() {
    _(this.caseChildren)
  }
}

export default Types<SwitchProps>(Switch)
