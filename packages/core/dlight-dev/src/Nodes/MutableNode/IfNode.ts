import DLight, { type DLNode } from "@dlightjs/dlight"

export class IfNode extends DLight.IfNode {
  _$bindNewNodes(nodes: DLNode[]): void {
    super._$bindNewNodes(nodes)
    window.updateNodes?.()
  }
}
