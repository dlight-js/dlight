import { DLNodeType } from "../DLNode"
import { FlatNode } from "./FlatNode"

export class TryNode extends FlatNode {
  /**
   * @brief Constructor, If type, accept a function that returns a list of nodes
   * @param caseFunc
   */
  constructor(tryFunc, catchFunc) {
    super(DLNodeType.Try)
    this.tryFunc = tryFunc
    const nodes = this.triable(tryFunc, catchFunc)
    if (nodes) this._$nodes = nodes
  }

  update(changed) {
    this.updateFunc?.(changed)
  }

  caught(catchFunc) {
    const nodes = this.geneNewNodesInEnv(() => catchFunc(this))
    this._$nodes && this.removeNodes(this._$nodes)
    const parentEl = this._$parentEl
    const flowIndex = ExpNode.getFlowIndexFromNodes(parentEl._$nodes, this)
    const nextSibling = parentEl.childNodes[flowIndex]
    ExpNode.appendNodesWithSibling(nodes, parentEl, nextSibling)
    ExpNode.runDidMount()
    this._$nodes = nodes
  }

  setUpdateFunc(updateFunc) {
    this.updateFunc = updateFunc
  }

  triable(closure, catchFunc) {
    return closure(this.setUpdateFunc.bind(this), callback => {
      if (typeof callback !== "function") return callback

      return (...args) => {
        try {
          return callback(...args)
        } catch (e) {
          const nodes = this.geneNewNodesInEnv(() =>
            catchFunc(this.setUpdateFunc.bind(this), e)
          )
          this._$nodes && this.removeNodes(this._$nodes)
          const parentEl = this._$parentEl
          const flowIndex = FlatNode.getFlowIndexFromNodes(
            parentEl._$nodes,
            this
          )
          const nextSibling = parentEl.childNodes[flowIndex]
          FlatNode.appendNodesWithSibling(nodes, parentEl, nextSibling)
          FlatNode.runDidMount()
          this._$nodes = nodes
        }
      }
    })
  }
}
