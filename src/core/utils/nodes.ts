import { DLNode, DLNodeType } from "../Nodes"

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

export function loopNodes(nodes: DLNode[], runFunc: (node: DLNode) => boolean) {
    for (let node of nodes) {
        let continueLoop
        switch (node._$nodeType) {
            case DLNodeType.Text:
                runFunc(node) 
                break
            case DLNodeType.For:
                continueLoop = runFunc(node) 
                if (continueLoop) {
                    for (let nodes of node._$dlNodess) {
                        loopNodes(nodes, runFunc)
                    }
                }
                break
            case DLNodeType.Env:
            case DLNodeType.Dlight:
            case DLNodeType.If:
            case DLNodeType.HTML:
                continueLoop = runFunc(node) 
                if (continueLoop) loopNodes(node._$dlNodes, runFunc)
                break
        }
    }
}