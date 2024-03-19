import { DLNodeType } from "../DLNode"
import { FlatNode } from "./FlatNode"
import { EnvNode } from "../EnvNode"

export class TryNode extends FlatNode {
  constructor(tryFunc, catchFunc) {
    super(DLNodeType.Try)
    this.tryFunc = tryFunc
    const catchable = this.getCatchable(catchFunc)
    this.envNode = new EnvNode({ _$catchable: catchable })
    const nodes = tryFunc(this.setUpdateFunc.bind(this), catchable) ?? []
    this.envNode.initNodes(nodes)
    this._$nodes = nodes
  }

  update(changed) {
    this.updateFunc?.(changed)
  }

  setUpdateFunc(updateFunc) {
    this.updateFunc = updateFunc
  }

  getCatchable(catchFunc) {
    return callback =>
      (...args) => {
        try {
          return callback(...args)
        } catch (e) {
          // ---- Run it in next tick to make sure when error occurs before
          //      didMount, this._$parentEl is not null
          Promise.resolve().then(() => {
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
          })
        }
      }
  }
}
