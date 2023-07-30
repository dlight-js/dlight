import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { loopNodes } from "../utils/nodes"

export class EnvNode extends DLNode {
  addPropFuncs: Record<string, (node: CustomNode) => any> = {}

  constructor() {
    super(DLNodeType.Env)
  }

  _$addNodes(nodes: DLNode[]) {
    this._$nodes = nodes
  }

  // 将prop加进子组件
  _$addProp(key: string, propOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    this.addPropFuncs[key] = node => { addDLProp(node, "env", key, propOrFunc, dlScope, listenDeps) }
  }

  addProps(node: CustomNode, avoidKeys: string[] = []) {
    const addPropFuncs = Object.entries(this.addPropFuncs)
      .filter(([key]) => !avoidKeys.includes(key))
      .map(([, value]) => value)
    for (const addPropFunc of addPropFuncs) {
      addPropFunc(node)
    }
  }

  addPropsToNodes(nodes: DLNode[], avoidKeys: string[] = []) {
    loopNodes(nodes, (n: DLNode) => {
      console.log(this, n, "hh", this.addPropFuncs)
      if (n._$nodeType === DLNodeType.Env) {
        n._$addBeforeInitSubNodes((newNodes: any) => {
          this.addPropsToNodes(newNodes, Object.keys((n as any).addPropFuncs))
        })
      } else {
        n._$addBeforeInitSubNodes((newNodes: any) => {
          this.addPropsToNodes(newNodes)
        })
      }
      if (n._$nodeType === DLNodeType.Custom) {
        this.addProps(n as CustomNode, avoidKeys)
      }
      return false
    })
  }

  _$init() {
    this.addPropsToNodes(this._$nodes)
    this._$bindNodes()
  }
}
