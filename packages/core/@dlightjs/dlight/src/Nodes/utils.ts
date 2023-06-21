import { type CustomNode } from "./CustomNode"
import { type DLNode, DLNodeType } from "./DLNode"
import { type HtmlNode } from "./HtmlNode"
import { loopEls, loopNodes } from "../utils/nodes"

export function appendEls(htmlNode: HtmlNode, nodes: DLNode[]) {
  loopNodes(nodes, node => {
    switch (node._$nodeType) {
      case DLNodeType.Text:
      case DLNodeType.HTML:
        (node as HtmlNode).willAppear(node._$el, node as HtmlNode)
        htmlNode._$el.appendChild(node._$el)
        ;(node as HtmlNode).didAppear(node._$el, node as HtmlNode)
        break
      default:
        appendEls(htmlNode, node._$nodes)
        break
    }
    return false
  })
}

/**
 * 把nodes对应的elements从dom上移除
 * @param nodes
 */
export function removeNodes(nodes: DLNode[]) {
  willUnmountDlightNodes(nodes)
  loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
    const isInDOM = document.body.contains(el)
    if (!isInDOM) return
    if (node._$nodeType === DLNodeType.HTML) {
      node.willDisappear(el, node)
    }
    el.remove()
    if (node._$nodeType === DLNodeType.HTML) {
      node.didDisappear(el, node)
    }
  })
  didUnmountDlightNodes(nodes)
}

export function detachNodes(nodes: DLNode[]) {
  for (const node of nodes) {
    node._$detach()
  }
}
/**
 * 删掉所有有关node的deps
 * @param nodes
 * @param dlScope
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: CustomNode) {
  loopNodes(nodes, (node: DLNode) => {
    for (const i of node._$depObjectIds) {
      dlScope._$deleteDeps(i)
    }
    if (node._$nodeType === DLNodeType.Custom) {
      deleteNodesDeps((node as CustomNode)._$children, dlScope)
    }
    return true
  })
}

/**
 * 把DLNode插到指定index的parentEl上
 * 如果index===length说明是最后一个append
 * 不然就insertBefore
 * @param nodes
 * @param index
 * @param parentEl
 * @param lengthIn - 调用parentEl.childNodes.length会浪费时间，从外面传入会省很多时间
 * @returns
 */
export function appendNodesWithIndex(nodes: DLNode[], index: number, parentEl: HTMLElement, lengthIn?: number): [number, number] {
  let length = lengthIn ?? parentEl.childNodes.length
  loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
    const isInDOM = document.body.contains(el)
    if ([DLNodeType.HTML].includes(node._$nodeType) && !isInDOM) {
      // ---- 不在DOM上
      loopLifeCycle(node, "willAppear")
    }
    if (index === length) {
      parentEl.appendChild(el)
    } else {
      parentEl.insertBefore(el, parentEl.childNodes[index] as any)
    }
    if ([DLNodeType.HTML].includes(node._$nodeType) && !isInDOM) {
      loopLifeCycle(node, "didAppear")
    }
    index++
    length++
  }, false)
  return [index, length]
}

function loopLifeCycle(node: HtmlNode, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
  node[lifeCycleName](node._$el, node)
  loopEls(node._$nodes, (el, n) => {
    if ([DLNodeType.HTML].includes(n._$nodeType)) {
      n[lifeCycleName](el, n)
    }
  }, true)
}

/**
 * flowCursor相关，index表明前面有n个普通HTMLElement
 * flowNodes是flow相关的节点，element个数不定，每次插入都要重新计算，但是这个节点的reference是固定的
 * @param flowNodes
 * @returns
 */
export function getFlowIndexFromParentNode(parentNode: HtmlNode, stopNode: DLNode) {
  return getFlowIndexFromNodesTillId(parentNode._$nodes, stopNode)
}

export function getFlowIndexFromNodes(nodes: DLNode[]) {
  return getFlowIndexFromNodesTillId(nodes, undefined as any)
}

function getFlowIndexFromNodesTillId(nodes: DLNode[], stopNode: DLNode) {
  let index = 0
  let stop = false
  loopNodes(nodes, (node: DLNode) => {
    if (stop) return false
    if (node === stopNode) {
      stop = true
      return false
    }
    if ([DLNodeType.Text, DLNodeType.HTML].includes(node._$nodeType)) {
      index++
      return false
    }
    return true
  })
  return index
}

/**
 * 四个生命周期
 * @param nodes
 */
function runDlightNodesLifecycle(nodes: DLNode[], lifecysle: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
  loopNodes(nodes, (node: DLNode) => {
    if ([DLNodeType.Custom].includes(node._$nodeType)) {
      (node as any)[lifecysle](node)
    }
    return true
  })
}

export function willMountDlightNodes(nodes: DLNode[]) {
  runDlightNodesLifecycle(nodes, "willMount")
}

export function didMountDlightNodes(nodes: DLNode[]) {
  runDlightNodesLifecycle(nodes, "didMount")
}

export function willUnmountDlightNodes(nodes: DLNode[]) {
  runDlightNodesLifecycle(nodes, "willUnmount")
}

export function didUnmountDlightNodes(nodes: DLNode[]) {
  runDlightNodesLifecycle(nodes, "didUnmount")
}
