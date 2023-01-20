import { DLNode, DLNodeType, HtmlNode } from "../Nodes"

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
        const continueLoop = runFunc(node) 
        if (continueLoop) loopNodes(node._$nodes, runFunc)
    }
}

export function loopEls(nodes: DLNode[], runFunc: (el: HTMLElement, node: HtmlNode) => void, deep=true) {
    for (let node of nodes) {
        if ([DLNodeType.HTML, DLNodeType.Text].includes(node._$nodeType)) {
            runFunc(node._$el, node as HtmlNode) 
            if (deep) loopEls(node._$nodes, runFunc)
        } else {
            loopEls(node._$nodes, runFunc)        
        }
    }
}

export function toEls(nodes: DLNode[]) {
    const els: HTMLElement[] = []
    loopEls(nodes, (el, node) => {
        if(node._$nodeType === DLNodeType.HTML) {
            els.push(el)
        }
    }, false)
    return els
}