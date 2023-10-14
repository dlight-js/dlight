import DLight, { DLNodeType, loopNodes } from "@dlightjs/dlight"
import { type GraphNode, devStore } from "../utils/store"
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

  render(idOrEl: string | HTMLElement) {
    super.render(idOrEl)

    function dfs(rootNode: any) {
      const graphNode: GraphNode = {
        id: rootNode._$id!,
        children: []
      }
      loopNodes(rootNode._$nodes, (node: any) => {
        if (node._$nodeType === DLNodeType.Custom) {
          graphNode.children.push(dfs(node))
        }
        return false
      })

      return graphNode
    }

    devStore.nodes.push(dfs(this))
  }
}
