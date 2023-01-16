import { DLNode } from "../Nodes/Node"

export function initNodes(nodes: DLNode[] | DLNode[][]) {
    for (let node of nodes) {
        if (Array.isArray(node)) {
            initNodes(node)
            continue
        }
        node._$init()
    }
}
export function bindParentNode(nodes: DLNode[] | DLNode[][], parentNode: DLNode) {
    for (let node of nodes) {
        if (Array.isArray(node)) {
            bindParentNode(node, parentNode)
            continue
        }
        node._$parentNode = parentNode
    }
}
