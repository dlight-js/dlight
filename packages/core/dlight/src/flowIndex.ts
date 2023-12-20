import { loopDLNodes, loopShallowDLNodes, loopShallowEls } from "./nodes"

//
export function getFlowIndexFromNodes(nodes: any[], stopNode?: any) {
  let index = 0
  loopShallowDLNodes(nodes, (node, isDL) => {
    if (!isDL) index++
    else if (node === stopNode) return false
  })
  return index
}

// --- Add child nodes
export function appendNodesWithSibling(nodes: any[], parentEl: HTMLElement, nextSibling: HTMLElement) {
  if (nextSibling) return insertNodesBefore(nodes, parentEl, nextSibling)
  return appendNodes(nodes, parentEl)
}

export function appendNodesWithIndex(nodes: any[], parentEl: HTMLElement, index: number, length?: number) {
  length = length ?? parentEl.childNodes.length
  if (length !== index) return insertNodesBefore(nodes, parentEl, parentEl.childNodes[index] as any)
  return appendNodes(nodes, parentEl)
}

export function insertNodesBefore(nodes: any[], parentEl: HTMLElement, nextSibling: HTMLElement) {
  let count = 0
  loopShallowEls(nodes, el => {
    parentEl.insertBefore(el, nextSibling)
    count++
  })
  return count
}

export function appendNodes(nodes: any[], parentEl: HTMLElement) {
  let count = 0
  loopShallowEls(nodes, el => {
    parentEl.appendChild(el)
    count++
  })
  return count
}

// ----
export function removeNodes(parentEl: HTMLElement, nodes: any[]) {
  loopDLNodes(nodes, node => {
    node.willUnmount?.()
  })
  loopShallowEls(nodes, el => {
    parentEl.removeChild(el)
  })
  loopDLNodes(nodes, node => {
    node.didUnmount?.()
  })
}
