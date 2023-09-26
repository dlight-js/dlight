import { type CustomNode } from "../CustomNode"
import { type EnvNode } from "../EnvNode"
import { type HtmlNode } from "../HtmlNode"
import { type DLNode, DLNodeType } from "../DLNode"
import { appendNodesWithIndex, deleteNodesDeps, getFlowIndexFromParentNode, removeNodes } from "../utils"
import { MutableNode } from "./MutableNode"

interface ConditionPair {
  condition: () => boolean
  node: () => DLNode[]
}

export class IfNode extends MutableNode {
  conditionPairs: ConditionPair[] = []
  condition?: string
  listenDeps: string[] = []
  dlScope?: CustomNode
  _$envNodes?: EnvNode[] = []

  constructor(id: string) {
    super(DLNodeType.If, id)
  }

  _$addCond(condition: () => boolean, node: () => DLNode[], dlScope?: CustomNode, listenDeps?: string[]) {
    this.conditionPairs.push({ condition, node })
    if (listenDeps) {
      if (!this.dlScope) this.dlScope = dlScope
      this.listenDeps.push(...listenDeps)
    }
  }

  _$init() {
    // ---- 生成nodes
    // ---- 只要找到符合条件的就break
    let nodes: DLNode[] = []
    for (const conditionPair of this.conditionPairs) {
      if (conditionPair.condition()) {
        this.condition = conditionPair.condition.toString()
        nodes = conditionPair.node()
        break
      }
    }
    this._$nodes = nodes
    // ---- 加if依赖
    // ---- 找到HTMLNode作为parentNode，因为它是有真实el的
    let parentNode: DLNode | undefined = this._$parentNode
    while (parentNode && parentNode._$nodeType !== DLNodeType.HTML) {
      parentNode = parentNode._$parentNode
    }

    if (parentNode) {
      this.dlScope?._$addDeps(this.listenDeps, () => { this.update(parentNode as HtmlNode) }, this)
    }

    this._$bindNodes()
  }

  update(parentNode: HtmlNode) {
    const prevNodes = this._$nodes
    const condition = this.condition
    this._$nodes = []
    for (const conditionPair of this.conditionPairs) {
      if (conditionPair.condition()) {
        if (this.condition !== conditionPair.condition.toString()) {
          // ---- 改变状态了，清除对应deps
          deleteNodesDeps(prevNodes, this.dlScope!)
          removeNodes(parentNode._$el, prevNodes)

          this.condition = conditionPair.condition.toString()
          // ---- 新的
          this._$nodes = conditionPair.node()
          this._$bindNewNodes(this._$nodes)
        } else {
          // ---- 和之前状态一样就直接不管
          this._$nodes = prevNodes
        }
        break
      }
    }

    if (prevNodes.length !== 0 && this._$nodes.length === 0) {
      // ---- 以前有，现在没有
      this.condition = "[none]"
      // ---- 改变状态了，清除对应deps
      deleteNodesDeps(prevNodes, this.dlScope!)
      removeNodes(parentNode._$el, prevNodes)
    }
    if (condition === this.condition) return

    const flowIndex = getFlowIndexFromParentNode(parentNode, this)

    const parentEl = parentNode._$el
    appendNodesWithIndex(this._$nodes, flowIndex, parentEl, parentEl.childNodes.length)

    this.onUpdateNodes(prevNodes, this._$nodes)
  }
}
