import { bindParentNode, initNodes, toEls } from "../utils/nodes"

export enum DLNodeType {
  HTML, Text, Custom, For, If, Env, Expression
}
export class DLNode {
  _$nodeType: DLNodeType
  private __$el: Node | HTMLElement | any
  get _$el(): Node | HTMLElement | any {
    return this.__$el ?? toEls(this._$nodes)
  }

  set _$el(value: Node | HTMLElement | any) {
    this.__$el = value
  }

  _$parentNode?: DLNode
  _$nodes: DLNode[] = []

  _$beforeInitSubNodes(_nodes: DLNode[]) {}
  _$addBeforeInitSubNodes(func: (_nodes: DLNode[]) => any) {
    const prevBeforeInitSubNodes = this._$beforeInitSubNodes
    this._$beforeInitSubNodes = function(nodes: DLNode[]) {
      prevBeforeInitSubNodes.call(this, nodes)
      func.call(this, nodes)
    }
  }

  // 将子组件挂在该组件上，将子组件init
  _$bindNodes() {
    bindParentNode(this._$nodes, this)
    this._$beforeInitSubNodes(this._$nodes)
    initNodes(this._$nodes)
  }

  constructor(nodeType: DLNodeType) {
    this._$nodeType = nodeType
  }

  _$init() {}
}
