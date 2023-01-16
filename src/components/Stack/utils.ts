import {DLNode} from "@/core/Nodes/Node";

export function setAfterNodesCreated(nodes: DLNode[], runFunc: any) {
    for (let node of nodes) {
        switch (node._$nodeType) {
            case "text":
            case "html":
                runFunc(node)
                break
            case "dlight":
            case "for":
            case "if":
                node._$afterElsCreated = (nodes: DLNode[]) => {
                    setAfterNodesCreated(nodes, runFunc)
                }
                break
        }
    }
}