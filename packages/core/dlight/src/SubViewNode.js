import { DLNode, DLNodeType } from "./DLNode"

export class SubViewNode extends DLNode {
  constructor() {
    super(DLNodeType.Subview)
  }
}
