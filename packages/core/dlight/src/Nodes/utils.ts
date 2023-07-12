import { type CustomNode } from "./CustomNode"
import { type DLNode, DLNodeType } from "./DLNode"
import { type HtmlNode } from "./HtmlNode"
import { loopEls, loopNodes } from "../utils/nodes"

export function appendEls(htmlNode: HtmlNode, nodes: DLNode[]) {
  loopNodes(nodes, node => {
    switch (node._$nodeType) {
      case DLNodeType.Text:
        htmlNode._$el.appendChild(node._$el)
        break
      case DLNodeType.HTML:
        (node as any).willAppear && (node as any).willAppear(node._$el, node as HtmlNode)
        htmlNode._$el.appendChild(node._$el)
        ;(node as any).didAppear && (node as any).didAppear(node._$el, node as HtmlNode)
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
export function removeNodes(parentEl: HTMLElement, nodes: DLNode[]) {
  willUnmountDlightNodes(nodes)
  loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
    if (node._$nodeType === DLNodeType.HTML && (node as any).willDisappear) {
      (node as any).willDisappear(el, node)
    }
    parentEl.removeChild(el)
    if (node._$nodeType === DLNodeType.HTML && (node as any).didDisappear) {
      (node as any).didDisappear(el, node)
    }
  }, false)
  didUnmountDlightNodes(nodes)
}

/**
 * 删掉所有有关node的deps
 * @param nodes
 * @param dlScope
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: CustomNode) {
  loopNodes(nodes, (node: DLNode) => {
    if ((node as any)._$cleanUps) {
      for (const cleanUp of (node as any)._$cleanUps) {
        cleanUp()
      }
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
export function appendNodesWithIndex(nodes: DLNode[], index: number, parentEl: HTMLElement, lengthIn?: number, alreadyInDOM?: boolean): [number, number] {
  let length = lengthIn ?? parentEl.childNodes.length
  loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
    if (DLNodeType.HTML === node._$nodeType && !alreadyInDOM && (node as any).willAppear) {
      // ---- 不在DOM上
      (node as any).willAppear(node._$el, node)
    }
    if (index === length) {
      parentEl.appendChild(el)
    } else {
      parentEl.insertBefore(el, parentEl.childNodes[index] as any)
    }
    if (DLNodeType.HTML === node._$nodeType && !alreadyInDOM && (node as any).didAppear) {
      (node as any).didAppear(node._$el, node)
    }
    index++
    length++
  }, false)
  return [index, length]
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

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) {
    return true
  }
  if (a == null || b == null || a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

export function classNameJoin(classNames: string | string[]) {
  return Array.isArray(classNames) ? classNames.filter(Boolean).join(" ") : classNames || ""
}
