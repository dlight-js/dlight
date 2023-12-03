import DLight, { DLNodeType, loopNodes } from "@dlightjs/dlight"
import { geneId } from "../utils/utils"

export class CustomNode extends DLight.CustomNode {
  _$id?: string

  _$init() {
    super._$init()
    this._$id = geneId.call(this)
    const loopFunc = (node: any) => {
      if (node._$nodeType === DLNodeType.HTML) {
        node._$el.setAttribute("comp-id", this._$id)
      } else if (node._$nodeType === DLNodeType.Custom) {
        return false
      }
    }
    loopNodes(this._$nodes, loopFunc)
  }

  _$updateProperty(key: string, value: any): void {
    super._$updateProperty(key, value)
    window.sendCurrentProps?.()
  }

  render(idOrEl: string | HTMLElement) {
    super.render(idOrEl)
    window.entryNode = this
    window.updateNodes?.()
  }
}
