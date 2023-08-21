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
export function bindParentNode(nodes: DLNode[] | DLNode[][], parentNode: DLNode, idx = 0) {
  for (const node of nodes) {
    if (Array.isArray(node)) {
      bindParentNode(node, parentNode, idx)
      continue
    }
    node._$parentNode = parentNode

    if (node._$nodeType !== DLNodeType.Custom) {
      node._$id = `${parentNode._$id}-${idx}`
    } else {
      node._$id = `${parentNode._$id}:${idx}`
    }

    if (node._$nodeType === DLNodeType.Text) {
      let p: any = parentNode
      while (p._$nodeType !== DLNodeType.HTML) {
        p = p._$parentNode
      }
      p._$el.setAttribute(`text${node._$id}`, "")
    }
    idx++
  }
}

export function loopNodes(nodes: DLNode[], runFunc: (node: DLNode) => boolean) {
  for (const node of nodes) {
    const continueLoop = runFunc(node)
    if (continueLoop) loopNodes(node._$nodes, runFunc)
  }
}

export function loopEls(nodes: DLNode[], runFunc: (el: HTMLElement, node: HtmlNode) => void, deep = true) {
  for (const node of nodes) {
    if ([DLNodeType.HTML, DLNodeType.Text].includes(node._$nodeType)) {
      runFunc(node._$el, node as HtmlNode)
      if (deep) loopEls(node._$nodes, runFunc)
    } else {
      loopEls(node._$nodes, runFunc, deep)
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
