import { type CustomNode } from "./CustomNode"
import { type DLNode, DLNodeType } from "./DLNode"
import { type HtmlNode } from "./HtmlNode"
import { loopEls, loopNodes } from "../utils/nodes"
import { type AnyDLNode } from "./type"
import { TextNode } from "./TextNode"

export function appendEls(htmlNode: HtmlNode, nodes: DLNode[]) {
  nodes.forEach((node: DLNode) => {
    switch (node._$nodeType) {
      case DLNodeType.Text:
        htmlNode._$el.appendChild(node._$el)
        break
      case DLNodeType.HTML:
        (node as any).willAppear?.(node._$el, node as HtmlNode)
        htmlNode._$el.appendChild(node._$el)
        ;(node as any).didAppear?.(node._$el, node as HtmlNode)
        break
      default:
        appendEls(htmlNode, node._$nodes)
        break
    }
  })
}

/**
 * Remove nodes' elements from DOM
 */
export function removeNodes(parentEl: HTMLElement, nodes: DLNode[]) {
  runDLightNodesWillLifecycle(nodes)
  loopEls(nodes, (el: HTMLElement, node: HtmlNode) => {
    if (node._$nodeType === DLNodeType.HTML) {
      (node as AnyDLNode).willDisappear?.(el, node)
    }
    parentEl.removeChild(el)
    if (node._$nodeType === DLNodeType.HTML) {
      (node as AnyDLNode).didDisappear?.(el, node)
    }
  }, false)
  runDLightNodesDidLifecycle(nodes)
}

/**
 * 删掉所有有关node的deps
 * @param nodes
 * @param dlScope
 */
export function deleteNodesDeps(nodes: DLNode[], dlScope: CustomNode) {
  const depArr = (dlScope as AnyDLNode)._$stateDepArr
  if (!depArr) return
  const cleanUpDepFuncs: Array<() => void> = []
  loopNodes(nodes, (node: DLNode) => {
    const cleanUps = (node as AnyDLNode)._$cleanUps
    if (!cleanUps) return
    cleanUpDepFuncs.push(...cleanUps)
  })

  depArr.forEach((dep: string) => {
    cleanUpDepFuncs.forEach(func => {
      (dlScope as AnyDLNode)[dep].delete(func)
    })
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
    if (node._$nodeType === DLNodeType.HTML && !alreadyInDOM) {
      // ---- 不在DOM上
      (node as any).willAppear?.(node._$el, node)
    }
    if (index === length) {
      parentEl.appendChild(el)
    } else {
      parentEl.insertBefore(el, parentEl.childNodes[index] as any)
    }
    if (node._$nodeType === DLNodeType.HTML && !alreadyInDOM) {
      (node as any).didAppear?.(node._$el, node)
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
    if (node._$nodeType === DLNodeType.HTML || node._$nodeType === DLNodeType.Text) {
      index++
      return false
    }
    return true
  })
  return index
}

function runDLightNodesWillLifecycle(nodes: DLNode[]) {
  loopNodes(nodes, (node: DLNode) => {
    if (node._$nodeType === DLNodeType.Custom) {
      (node as AnyDLNode).willUnmount?.(node)
    }
    if (node._$nodeType === DLNodeType.HTML) {
      (node as AnyDLNode).willDisappear?.(node._$el, node)
    }
  })
}

function runDLightNodesDidLifecycle(nodes: DLNode[]) {
  loopNodes(nodes, (node: DLNode) => {
    if (node._$nodeType === DLNodeType.Custom) {
      (node as AnyDLNode).didUnmount?.(node)
    }
    if (node._$nodeType === DLNodeType.HTML) {
      (node as AnyDLNode).didDisappear?.(node._$el, node)
    }
  })
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

export function formatNodes(nodes: AnyDLNode) {
  if (!Array.isArray(nodes)) nodes = [nodes]
  return nodes
    .map((node: any) => {
      if (typeof node === "function") return node()
      return node
    })
    .flat(1)
    .filter((node: AnyDLNode) => (
      node !== undefined && node !== null && typeof node !== "boolean"
    )).map((node: any) => {
      if (node._$nodeType !== undefined) return node
      return new TextNode(node)
    })
}
