import { DLStore } from "./store"

export const DLNodeType = {
  Comp: 0,
  For: 1,
  Cond: 2,
  Env: 3,
  Exp: 4,
  Subview: 5,
  Try: 6,
}

export class DLNode {
  /**
   * @brief Node type: HTML, Text, Custom, For, If, Env, Expression
   */
  _$dlNodeType

  /**
   * @brief Constructor
   * @param nodeType
   */
  constructor(nodeType) {
    this._$dlNodeType = nodeType
  }

  /**
   * @brief Node element
   *  Either one real element for HTMLNode and TextNode
   *  Or an array of DLNode for CustomNode, ForNode, IfNode, EnvNode, ExpNode
   */
  get _$el() {
    return DLNode.toEls(this._$nodes)
  }

  /**
   * @brief Loop all child DLNodes to get all the child elements
   * @param nodes
   * @returns HTMLElement[]
   */
  static toEls(nodes) {
    const els = []
    this.loopShallowEls(nodes, el => {
      els.push(el)
    })
    return els
  }

  // ---- Loop nodes ----
  /**
   * @brief Loop all elements shallowly,
   *  i.e., don't loop the child nodes of dom elements and only call runFunc on dom elements
   * @param nodes
   * @param runFunc
   */
  static loopShallowEls(nodes, runFunc) {
    const stack = [...nodes].reverse()
    while (stack.length > 0) {
      const node = stack.pop()
      if (!("_$dlNodeType" in node)) runFunc(node)
      else node._$nodes && stack.push(...[...node._$nodes].reverse())
    }
  }

  /**
   * @brief Add parentEl to all nodes until the first element
   * @param nodes
   * @param parentEl
   */
  static addParentEl(nodes, parentEl) {
    nodes.forEach(node => {
      if ("_$dlNodeType" in node) {
        node._$parentEl = parentEl
        node._$nodes && DLNode.addParentEl(node._$nodes, parentEl)
      }
    })
  }

  // ---- Flow index and add child elements ----
  /**
   * @brief Get the total count of dom elements before the stop node
   * @param nodes
   * @param stopNode
   * @returns total count of dom elements
   */
  static getFlowIndexFromNodes(nodes, stopNode) {
    let index = 0
    const stack = [...nodes].reverse()
    while (stack.length > 0) {
      const node = stack.pop()
      if (node === stopNode) break
      if ("_$dlNodeType" in node) {
        node._$nodes && stack.push(...[...node._$nodes].reverse())
      } else {
        index++
      }
    }
    return index
  }

  /**
   * @brief Given an array of nodes, append them to the parentEl
   *  1. If nextSibling is provided, insert the nodes before the nextSibling
   *  2. If nextSibling is not provided, append the nodes to the parentEl
   * @param nodes
   * @param parentEl
   * @param nextSibling
   * @returns Added element count
   */
  static appendNodesWithSibling(nodes, parentEl, nextSibling) {
    if (nextSibling) return this.insertNodesBefore(nodes, parentEl, nextSibling)
    return this.appendNodes(nodes, parentEl)
  }

  /**
   * @brief Given an array of nodes, append them to the parentEl using the index
   *  1. If the index is the same as the length of the parentEl.childNodes, append the nodes to the parentEl
   *  2. If the index is not the same as the length of the parentEl.childNodes, insert the nodes before the node at the index
   * @param nodes
   * @param parentEl
   * @param index
   * @param length
   * @returns Added element count
   */
  static appendNodesWithIndex(nodes, parentEl, index, length) {
    length = length ?? parentEl.childNodes.length
    if (length !== index)
      return this.insertNodesBefore(nodes, parentEl, parentEl.childNodes[index])
    return this.appendNodes(nodes, parentEl)
  }

  /**
   * @brief Insert nodes before the nextSibling
   * @param nodes
   * @param parentEl
   * @param nextSibling
   * @returns Added element count
   */
  static insertNodesBefore(nodes, parentEl, nextSibling) {
    let count = 0
    this.loopShallowEls(nodes, el => {
      parentEl.insertBefore(el, nextSibling)
      count++
    })
    return count
  }

  /**
   * @brief Append nodes to the parentEl
   * @param nodes
   * @param parentEl
   * @returns Added element count
   */
  static appendNodes(nodes, parentEl) {
    let count = 0
    this.loopShallowEls(nodes, el => {
      parentEl.appendChild(el)
      count++
    })
    return count
  }

  // ---- Lifecycle ----
  /**
   * @brief Add willUnmount function to node
   * @param node
   * @param func
   */
  static addWillUnmount(node, func) {
    const willUnmountStore = DLStore.global.WillUnmountStore
    const currentStore = willUnmountStore[willUnmountStore.length - 1]
    // ---- If the current store is empty, it means this node is not mutable
    if (!currentStore) return
    currentStore.push(func.bind(null, node))
  }

  /**
   * @brief Add didUnmount function to node
   * @param node
   * @param func
   */
  static addDidUnmount(node, func) {
    const didUnmountStore = DLStore.global.DidUnmountStore
    const currentStore = didUnmountStore[didUnmountStore.length - 1]
    // ---- If the current store is empty, it means this node is not mutable
    if (!currentStore) return
    currentStore.push(func.bind(null, node))
  }

  /**
   * @brief Add didUnmount function to global store
   * @param func
   */
  static addDidMount(node, func) {
    if (!DLStore.global.DidMountStore) DLStore.global.DidMountStore = []
    DLStore.global.DidMountStore.push(func.bind(null, node))
  }

  /**
   * @brief Run all didMount functions and reset the global store
   */
  static runDidMount() {
    const didMountStore = DLStore.global.DidMountStore
    if (!didMountStore || didMountStore.length === 0) return
    for (let i = didMountStore.length - 1; i >= 0; i--) {
      didMountStore[i]()
    }
    DLStore.global.DidMountStore = []
  }
}
