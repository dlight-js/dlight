import { DLNodeType } from "../DLNode"
import { type AnyDLNode } from "../types"
import { MutableNode } from "./MutableNode"

export class ExpNode extends MutableNode {
  nodesFunc
  constructor(nodesFunc: () => AnyDLNode[]) {
    super(DLNodeType.Exp)

    this.nodesFunc = nodesFunc
    this._$nodes = ExpNode.formatNodes(nodesFunc())
    console.log(this._$nodes)
  }

  update() {
    const newNodes = this.geneNewNodesInEnv(() => (
      ExpNode.formatNodes(this.nodesFunc())
    ))
    this.removeNodes(this._$nodes)

    // ---- Add new nodes
    const parentEl = (this as AnyDLNode)._$parentEl
    const flowIndex = MutableNode.getFlowIndexFromNodes(parentEl._$nodes, this)
    const nextSibling = parentEl._$nodes[flowIndex]
    MutableNode.appendNodesWithSibling(newNodes, parentEl, nextSibling)

    this._$nodes = newNodes
  }

  private static formatNodes(nodes: AnyDLNode) {
    if (!Array.isArray(nodes)) nodes = [nodes]
    return nodes
      .flat(1)
      .filter((node: AnyDLNode) => (
        node !== undefined && node !== null && typeof node !== "boolean"
      ))
      .map((node: any) => {
        if (
          typeof node === "string" ||
          typeof node === "number" ||
          typeof node === "bigint"
        ) {
          return document.createTextNode(`${node}`)
        }
        return node
      })
  }
}
