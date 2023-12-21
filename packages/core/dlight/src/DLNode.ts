import { type AnyDLNode } from "./types"

export enum DLNodeType {
  Comp, For, If, Env, Exp
}

export class DLNode {
  /**
   * @brief Node type: HTML, Text, Custom, For, If, Env, Expression
   */
  _$dlNodeType: DLNodeType

  constructor(nodeType: DLNodeType) {
    this._$dlNodeType = nodeType
  }

  /**
   * @brief Node element
   *  Either one real element for HTMLNode and TextNode
   *  Or an array of DLNode for CustomNode, ForNode, IfNode, EnvNode, ExpressionNode
   */
  private __$el: Node | HTMLElement | any
  get _$el(): Node | HTMLElement | any {
    return this.__$el ?? DLNode.toEls(this._$nodes)
  }

  set _$el(value: Node | HTMLElement | any) {
    this.__$el = value
  }

  _$parentEl?: HTMLElement

  /**
   * @brief Child DLNodes
   */
  _$nodes: AnyDLNode[] = []

  static toEls(nodes: DLNode[]) {
    const els: HTMLElement[] = []
    this.loopShallowEls(nodes, el => {
      els.push(el)
    })
    return els
  }

  // ---- Loop nodes
  static loopDLNodes(nodes: AnyDLNode[], runFunc: (node: AnyDLNode, isDL: boolean) => (boolean | void)) {
    const stack = [...nodes]
    while (stack.length > 0) {
      const node = stack.shift()!
      const isDL = "_$dlNodeType" in node
      if (runFunc(node, isDL) === false) break
      stack.unshift(...node._$nodes ?? [])
    }
  }

  static loopShallowEls(nodes: AnyDLNode[], runFunc: (node: AnyDLNode) => (boolean | void)) {
    const stack = [...nodes]
    while (stack.length > 0) {
      const node = stack.shift()!
      const isDL = "_$dlNodeType" in node
      if (!isDL) {
        if (runFunc(node) === false) break
      } else {
        stack.unshift(...node._$nodes ?? [])
      }
    }
  }

  static loopShallowDLNodes(nodes: any[], runFunc: (node: any, isDL: boolean) => (boolean | void)) {
    const stack = [...nodes]
    while (stack.length > 0) {
      const node = stack.shift()!
      const isDL = "_$dlNodeType" in node
      if (runFunc(node, isDL) === false) break
      if (isDL) {
        stack.unshift(...node._$nodes ?? [])
      }
    }
  }

  static addParentEl(nodes: AnyDLNode[], parentEl: HTMLElement) {
    this.loopShallowDLNodes(nodes, (node, isDL) => {
      if (isDL) {
        node._$parentEl = parentEl
      }
    })
  }

  // ---- Flow index
  static getFlowIndexFromNodes(nodes: any[], stopNode?: any) {
    let index = 0
    this.loopShallowDLNodes(nodes, (node, isDL) => {
      if (!isDL) index++
      else if (node === stopNode) return false
    })
    return index
  }

  static appendNodesWithSibling(nodes: any[], parentEl: HTMLElement, nextSibling: HTMLElement) {
    if (nextSibling) return this.insertNodesBefore(nodes, parentEl, nextSibling)
    return this.appendNodes(nodes, parentEl)
  }

  static appendNodesWithIndex(nodes: any[], parentEl: HTMLElement, index: number, length?: number) {
    length = length ?? parentEl.childNodes.length
    if (length !== index) return this.insertNodesBefore(nodes, parentEl, parentEl.childNodes[index] as any)
    return this.appendNodes(nodes, parentEl)
  }

  static insertNodesBefore(nodes: any[], parentEl: HTMLElement, nextSibling: HTMLElement) {
    let count = 0
    this.loopShallowEls(nodes, el => {
      parentEl.insertBefore(el, nextSibling)
      count++
    })
    return count
  }

  static appendNodes(nodes: any[], parentEl: HTMLElement) {
    let count = 0
    this.loopShallowEls(nodes, el => {
      parentEl.appendChild(el)
      count++
    })
    return count
  }
}
