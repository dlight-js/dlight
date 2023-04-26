import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { loopNodes } from "../utils/nodes"

export class EnvNode extends DLNode {
  addPropFuncs: Array<(node: CustomNode) => any> = []

  constructor() {
    super(DLNodeType.Env)
  }

  _$addNodes(nodes: DLNode[]) {
    this._$nodes = nodes
  }

  // 将prop加进子组件
  _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    this.addPropFuncs.push(node => { addDLProp(node, "env", key, propOrFunc, dlScope, listenDeps) })
  }

  addProps(node: CustomNode) {
    for (const addPropFunc of this.addPropFuncs) {
      addPropFunc(node)
    }
  }

  addPropsToNodes(nodes: DLNode[]) {
    loopNodes(nodes, (n: DLNode) => {
      n._$addBeforeInitSubNodes((newNodes: any) => {
        // ---- 这样可以监听变化
        this.addPropsToNodes(newNodes)
      })
      if (n._$nodeType === DLNodeType.Custom) {
        this.addProps(n as CustomNode)
      }
      return false
    })
  }

  _$init() {
    this.addPropsToNodes(this._$nodes)
    this._$bindNodes()
  }
}
