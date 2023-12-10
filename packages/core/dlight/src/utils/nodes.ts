import { type DLNode, DLNodeType, type HtmlNode } from "../Nodes"

export function initNodes(nodes: DLNode[] | DLNode[][]) {
  for (const node of nodes) {
    if (Array.isArray(node)) {
      initNodes(node)
      continue
    }
    node._$init()
  }
}
export function bindParentNode(nodes: DLNode[] | DLNode[][], parentNode: DLNode) {
  for (const node of nodes) {
    if (Array.isArray(node)) {
      bindParentNode(node, parentNode)
      continue
    }
    node._$parentNode = parentNode
  }
}

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function loopNodes(nodes: DLNode[], runFunc: (node: DLNode) => (boolean | void)) {
  for (const node of nodes) {
    const continueLoop = runFunc(node) ?? true
    if (continueLoop) loopNodes(node._$nodes, runFunc)
  }
}

export function loopEls(nodes: DLNode[], runFunc: (el: HTMLElement, node: HtmlNode) => void, deep = true) {
  for (const node of nodes) {
    if (node._$nodeType === DLNodeType.HTML || node._$nodeType === DLNodeType.Text) {
      runFunc(node._$el, node as HtmlNode)
      if (deep) loopEls(node._$nodes, runFunc)
    } else {
      loopEls(node._$nodes, runFunc, deep)
    }
  }
}

export function loopShallowEls(nodes: DLNode[], runFunc: (el: HTMLElement, node: HtmlNode) => void) {
  for (const node of nodes) {
    if (node._$nodeType === DLNodeType.HTML || node._$nodeType === DLNodeType.Text) {
      runFunc(node._$el, node as HtmlNode)
    } else {
      loopShallowEls(node._$nodes, runFunc)
    }
  }
}

export function toEls(nodes: DLNode[]) {
  const els: HTMLElement[] = []
  loopEls(nodes, (el, node) => {
    if (node._$nodeType === DLNodeType.HTML) {
      els.push(el)
    }
  }, false)
  return els
}
