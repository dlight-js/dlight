import { loopEls, loopNodes } from "../../utils/nodes"
import { type CustomNode } from "../CustomNode"
import { type DLNode, DLNodeType } from "../DLNode"
import { type HtmlNode } from "../HtmlNode"
import { TextNode } from "../TextNode"
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, removeNodes } from "../utils"
import { MutableNode } from "./MutableNode"

type ExpressionNodeType = DLNode | DLNode[]

export class ExpressionNode extends MutableNode {
  nodeOrFunc?: () => ExpressionNodeType
  listenDeps?: string[]
  dlScope?: CustomNode

  propFuncs: Array<() => any> = []

  constructor(nodeOrFunc: ExpressionNodeType | (() => ExpressionNodeType), dlScope?: CustomNode, listenDeps?: string[]) {
    super(DLNodeType.Expression)
    if (!listenDeps) {
      this._$nodes = this.formatNodes(nodeOrFunc)
      return
    }
    this.nodeOrFunc = nodeOrFunc as () => ExpressionNodeType
    this.listenDeps = listenDeps
    this.dlScope = dlScope
    this._$nodes = this.formatNodes(this.nodeOrFunc())
  }

  _$onUpdateNodes(func: () => any) {
    loopNodes(this._$nodes, node => {
      if (![DLNodeType.If, DLNodeType.For, DLNodeType.Expression].includes(node._$nodeType)) return true;
      (node as MutableNode).addOnUpdateNodesFunc(func)
      return true
    })
  }

  _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    // TODO 太复杂，要简化
    const addHtmlNodeProp = (node: HtmlNode) => {
      if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
        node._$addLifeCycle(valueOrFunc, key as any)
        return
      }
      // ---- 不覆盖其他，排除className
      if (key === "className") (node)._$addClassName(valueOrFunc, dlScope, listenDeps)
    }
    this.propFuncs.push(() => {
      for (const node of this._$nodes) {
        switch (node._$nodeType) {
          case DLNodeType.HTML:
            addHtmlNodeProp(node as HtmlNode)
            break
          // ---- 这一些都是要bindNodes的，在bindNodes时候给里面的_$nodes进行遍历加prop
          //      典型的如for循环，newNodes的时候也会bindNodes，也要加这些prop
          case DLNodeType.For:
          case DLNodeType.If:
          case DLNodeType.Expression:
            (node as any).addAfterUpdateNewNodesFunc((nodes: DLNode[]) => {
              loopEls(nodes, (_: HTMLElement, node: HtmlNode) => {
                if (node._$nodeType !== DLNodeType.HTML) return
                addHtmlNodeProp(node)
              }, false)
            })
          default:
            loopEls(node._$nodes, (_: HTMLElement, node: HtmlNode) => {
              if (node._$nodeType !== DLNodeType.HTML) return
              addHtmlNodeProp(node)
            }, false)
        }
      }
    })
  }

  formatNodes(nodes: any) {
    if (!Array.isArray(nodes)) {
      nodes = [nodes]
    }
    nodes = nodes.map((node: any) => {
      if (typeof node === "function") return node()
      return node
    })
    nodes = nodes.flat(1)
    nodes = nodes.filter((node: any) => (
      node !== undefined && node !== null && typeof node !== "boolean"
    )).map((node: any) => {
      if (node._$nodeType !== undefined) return node
      // TODO 其他 Array 什么的不处理？默认传成text？
      return new TextNode(node)
    })
    return nodes
  }

  _$init() {
    if (this.listenDeps === undefined) {
      this._$bindNodes()
      for (const func of this.propFuncs) {
        func()
      }
      return
    }
    // ---- 找到HTMLNode作为parentNode，因为它是有真实el的
    let parentNode: DLNode | undefined = this._$parentNode
    while (parentNode && parentNode._$nodeType !== DLNodeType.HTML) {
      parentNode = parentNode._$parentNode
    }

    if (!parentNode) return

    // ---- 加deps
    this.dlScope!._$addDeps(this.listenDeps, () => { this.update(parentNode! as HtmlNode) }, this)

    this._$bindNodes()
    for (const func of this.propFuncs) {
      func()
      this.dlScope!._$addDeps(this.listenDeps, func, this)
    }
  }

  update(parentNode: HtmlNode) {
    const prevNodes = this._$nodes
    // ---- 把以前的删除了
    deleteNodesDeps(this._$nodes, this.dlScope!)
    removeNodes(parentNode._$el, this._$nodes)

    // ---- 创建新的
    this._$nodes = this.formatNodes(this.nodeOrFunc!())
    this._$bindNewNodes(this._$nodes)

    // ---- 添加新的
    const parentEl = parentNode._$el
    const flowIndex = getFlowIndexFromParentNode(parentNode, this)
    appendNodesWithIndex(this._$nodes, flowIndex, parentEl, parentEl.childNodes.length)

    this.onUpdateNodes(prevNodes, this._$nodes)
  }
}
