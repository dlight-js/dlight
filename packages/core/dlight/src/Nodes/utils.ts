import { type CustomNode } from "./CustomNode"
import { type DLNode, DLNodeType } from "./DLNode"
import { type AnyDLNode } from "./type"

// /**
//  * 把DLNode插到指定index的parentEl上
//  * 如果index===length说明是最后一个append
//  * 不然就insertBefore
//  * @param nodes
//  * @param index
//  * @param parentEl
//  * @param lengthIn - 调用parentEl.childNodes.length会浪费时间，从外面传入会省很多时间
//  * @returns
//  */
// export function appendNodesWithIndex(nodes: DLNode[], parentEl: HTMLElement, index: number, length: number) {
//   const indexIn = index
//   const notLast = length !== index
//   loopShallowEls(nodes, (el: HTMLElement, node: HtmlNode) => {
//     if ((node as AnyDLNode).willAppear) {
//       (node as AnyDLNode).willAppear?.(node._$el, node)
//       delete (node as AnyDLNode).willAppear
//     }
//     if (notLast) {
//       parentEl.insertBefore(el, parentEl.childNodes[index])
//     } else {
//       parentEl.appendChild(el)
//     }
//     if ((node as AnyDLNode).willAppear) {
//       (node as AnyDLNode).didAppear?.(node._$el, node)
//       delete (node as AnyDLNode).didAppear
//     }
//     index++
//   })
//   return index - indexIn
// }

// export function appendNodesWithSibling(nodes: DLNode[], parentEl: HTMLElement, nextSibling: HTMLElement) {
//   if (nextSibling) return insertNodesBefore(nodes, parentEl, nextSibling)
//   appendNodes(nodes, parentEl)
// }

// export function insertNodesBefore(nodes: DLNode[], parentEl: HTMLElement, nextSibling: HTMLElement) {
// loopShallowEls(nodes, (el: HTMLElement, node: HtmlNode) => {
//   if ((node as AnyDLNode).willAppear) {
//     (node as AnyDLNode).willAppear?.(node._$el, node)
//     delete (node as AnyDLNode).willAppear
//   }
//   parentEl.insertBefore(el, nextSibling)
//   if ((node as AnyDLNode).willAppear) {
//     (node as AnyDLNode).didAppear?.(node._$el, node)
//     delete (node as AnyDLNode).didAppear
//   }
// })

// 将递归函数转换为迭代函数
//   const stack = [...nodes]
//   while (stack.length > 0) {
//     const node = stack.shift()!
//     if (node._$nodeType === DLNodeType.HTML || node._$nodeType === DLNodeType.Text) {
//       parentEl.insertBefore(node._$el, nextSibling)
//     } else if (node._$nodes) {
//       stack.unshift(...node._$nodes)
//     }
//   }
// }

// export function appendNodes(nodes: DLNode[], parentEl: HTMLElement) {
//   // loopShallowEls(nodes, (el: HTMLElement, node: HtmlNode) => {
//   //   if ((node as AnyDLNode).willAppear) {
//   //     (node as AnyDLNode).willAppear?.(node._$el, node)
//   //     delete (node as AnyDLNode).willAppear
//   //   }
//   //   parentEl.appendChild(el)
//   //   if ((node as AnyDLNode).willAppear) {
//   //     (node as AnyDLNode).didAppear?.(node._$el, node)
//   //     delete (node as AnyDLNode).didAppear
//   //   }
//   // })
//   // 使用 DocumentFragment 来减少直接对DOM的操作
//   // 将递归函数转换为迭代函数
//   const stack = [...nodes]
//   while (stack.length > 0) {
//     const node = stack.shift()!
//     if (node._$nodeType === DLNodeType.HTML || node._$nodeType === DLNodeType.Text) {
//       parentEl.appendChild(node._$el)
//     } else if (node._$nodes) {
//       stack.unshift(...node._$nodes)
//     }
//   }

//   // 一次性将所有节点附加到父元素
// }

/**
 * flowCursor相关，index表明前面有n个普通HTMLElement
 * flowNodes是flow相关的节点，element个数不定，每次插入都要重新计算，但是这个节点的reference是固定的
 * @param flowNodes
 * @returns
 */
// export function getFlowIndexFromParentNode(parentNode: HtmlNode, stopNode: DLNode) {
//   return getFlowIndexFromNodesTillId(parentNode._$nodes, stopNode)
// }

// export function getFlowIndexFromNodes(nodes: DLNode[]) {
//   return getFlowIndexFromNodesTillId(nodes, undefined as any)
// }

export function loopShallowDLNodes(nodes: DLNode[], runFunc: (node: DLNode, isDL: boolean) => (boolean | void)) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$nodeType" in node
    if (runFunc(node, isDL) === false) break
    if (isDL) {
      stack.unshift(...node._$nodes)
    }
  }
}

export function loopDLNodes(nodes: DLNode[], runFunc: (node: DLNode, isDL: boolean) => (boolean | void)) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$nodeType" in node
    if (runFunc(node, isDL) === false) break
    if (node._$nodes) {
      stack.unshift(...node._$nodes)
    }
  }
}


export function loopShallowEls(nodes: DLNode[], runFunc: (el: HTMLElement) => (boolean | void)) {
  // use stack instead of recursion
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift()!
    const isDL = "_$nodeType" in node
    if (!isDL) {
      if (runFunc(node) === false) break
    }
    if (isDL) {
      stack.unshift(...node._$nodes)
    }
  }
}

export function getFlowIndexFromNodes(nodes: DLNode[], stopNode: DLNode) {
  let index = 0
  loopShallowDLNodes(nodes, (node, isDL) => {
    if (!isDL) index++
    else if (node === stopNode) return false
  })
  return index
}

export function appendNodesWithIndex(nodes: DLNode[], parentEl: HTMLElement, index: number, length?: number) {
  length = length ?? parentEl.childNodes.length
  const indexIn = index
  const notLast = length !== index
  loopShallowEls(nodes, el => {
    if (notLast) {
      parentEl.insertBefore(el, parentEl.childNodes[index])
    } else {
      parentEl.appendChild(el)
    }
    index++
  })
  return index - indexIn
}

// function runDLightNodesWillLifecycle(nodes: DLNode[]) {
//   loopNodes(nodes, (node: DLNode) => {
//     (node as AnyDLNode).willUnmount?.(node)
//   })
// }

// function runDLightNodesDidLifecycle(nodes: DLNode[]) {
//   loopNodes(nodes, (node: DLNode) => {
//     (node as AnyDLNode).didUnmount?.(node)
//   })
// }

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
      const textNode = new TextNode()
      textNode.t(node)
      return textNode
    })
}

// -----

export function dlNodesToHTMLNodes(nodes: DLNode[]) {
  const stack = [...nodes]
  const htmlNodes: HtmlNode[] = []
  while (stack.length > 0) {
    const node = stack.shift()!
    if ("_$nodeType" in node) {
      stack.unshift(...node._$nodes)
    } else {
      htmlNodes.push(node as HtmlNode)
    }
  }

  return htmlNodes
}
