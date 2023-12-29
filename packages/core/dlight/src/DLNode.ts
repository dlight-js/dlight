export type AnyDLNode = any

export enum DLNodeType {
  Comp = 0,
  For,
  Cond,
  Env,
  Exp,
  Subview,
}

export class DLNode {
  /**
   * @brief Node type: HTML, Text, Custom, For, If, Env, Expression
   */
  _$dlNodeType: DLNodeType

  /**
   * @brief Constructor
   * @param nodeType
   */
  constructor(nodeType: DLNodeType) {
    this._$dlNodeType = nodeType
  }

  /**
   * @brief Node element
   *  Either one real element for HTMLNode and TextNode
   *  Or an array of DLNode for CustomNode, ForNode, IfNode, EnvNode, ExpNode
   */
  get _$el(): HTMLElement[] {
    return DLNode.toEls(this._$nodes!)
  }

  /**
   * @brief Parent dom element, will be passed to child nodes
   */
  _$parentEl?: HTMLElement

  /**
   * @brief Child DLNodes
   */
  _$nodes?: AnyDLNode[]

  /**
   * @brief Loop all child DLNodes to get all the child elements
   * @param nodes
   * @returns HTMLElement[]
   */
  private static toEls(nodes: DLNode[]): HTMLElement[] {
    const els: HTMLElement[] = []
    this.loopShallowEls(nodes, el => {
      els.push(el)
    })
    return els
  }

  // ---- Loop nodes ----
  /**
   * @brief Loop all child DLNodes deeply, including all the child nodes of child nodes
   * @param nodes
   * @param runFunc
   */
  static loopDLNodes(nodes: AnyDLNode[], runFunc: (node: AnyDLNode) => void) {
    nodes.forEach(node => {
      runFunc(node)
      node._$nodes && DLNode.loopDLNodes(node._$nodes, runFunc)
    })
  }

  /**
   * @brief Loop all child DLNodes deeply, including all the child nodes of child nodes
   * @param nodes
   * @param runFunc
   */
  static loopDLNodesInsideOut(
    nodes: AnyDLNode[],
    runFunc: (node: AnyDLNode) => void
  ) {
    nodes.forEach(node => {
      node._$nodes && DLNode.loopDLNodesInsideOut(node._$nodes, runFunc)
      runFunc(node)
    })
  }

  /**
   * @brief Loop all elements shallowly,
   *  i.e., don't loop the child nodes of dom elements and only call runFunc on dom elements
   * @param nodes
   * @param runFunc
   */
  static loopShallowEls(
    nodes: AnyDLNode[],
    runFunc: (node: AnyDLNode) => void
  ) {
    nodes.forEach(node => {
      if (!("_$dlNodeType" in node)) return runFunc(node)
      node._$nodes && DLNode.loopShallowEls(node._$nodes, runFunc)
    })
  }

  /**
   * @brief Loop all nodes shallowly,
   *  i.e., don't loop the child nodes of dom elements and call runFunc on all nodes
   * @param nodes
   * @param runFunc
   */
  static loopShallowDLNodes(nodes: any[], runFunc: (node: any) => void): void {
    nodes.forEach(node => {
      if ("_$dlNodeType" in node) {
        runFunc(node)
        node._$nodes && DLNode.loopShallowDLNodes(node._$nodes, runFunc)
      }
    })
  }

  /**
   * @brief Add parentEl to all nodes until the first element
   * @param nodes
   * @param parentEl
   */
  static addParentEl(nodes: AnyDLNode[], parentEl: HTMLElement): void {
    this.loopShallowDLNodes(nodes, node => {
      node._$parentEl = parentEl
    })
  }

  // ---- Flow index and add child elements ----
  /**
   * @brief Get the total count of dom elements before the stop node
   * @param nodes
   * @param stopNode
   * @returns total count of dom elements
   */
  static getFlowIndexFromNodes(
    nodes: AnyDLNode[],
    stopNode?: AnyDLNode
  ): number {
    let index = 0
    const stack = [...nodes]
    while (stack.length > 0) {
      const node = stack.shift()!
      if (node === stopNode) break
      if ("_$dlNodeType" in node) {
        node._$nodes && stack.unshift(...node._$nodes)
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
  static appendNodesWithSibling(
    nodes: AnyDLNode[],
    parentEl: HTMLElement,
    nextSibling: HTMLElement | undefined
  ): number {
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
  static appendNodesWithIndex(
    nodes: AnyDLNode[],
    parentEl: HTMLElement,
    index: number,
    length?: number
  ): number {
    length = length ?? parentEl.childNodes.length
    if (length !== index)
      return this.insertNodesBefore(
        nodes,
        parentEl,
        parentEl.childNodes[index] as any
      )
    return this.appendNodes(nodes, parentEl)
  }

  /**
   * @brief Insert nodes before the nextSibling
   * @param nodes
   * @param parentEl
   * @param nextSibling
   * @returns Added element count
   */
  static insertNodesBefore(
    nodes: AnyDLNode[],
    parentEl: HTMLElement,
    nextSibling: HTMLElement
  ): number {
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
  static appendNodes(nodes: any[], parentEl: HTMLElement): number {
    let count = 0
    this.loopShallowEls(nodes, el => {
      parentEl.appendChild(el)
      count++
    })
    return count
  }

  private static willUnmountFunc(currFunc: () => void, prevFunc?: () => void) {
    currFunc()
    prevFunc?.()
  }

  // ---- Lifecycle ----
  static addWillUnmount(node: AnyDLNode, func: () => void) {
    node.willUnmount = this.willUnmountFunc.bind(
      this,
      func,
      node.willUnmount?.bind(node)
    )
  }
}
