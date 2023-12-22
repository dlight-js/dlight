import { DLNode, DLNodeType } from "./DLNode"
import DLStore from "./DLStore"
import { type EnvNode } from "./EnvNode"
import { type AnyDLNode } from "./types"

export class CompNode extends DLNode {
  constructor() {
    super(DLNodeType.Comp)
  }

  _$initd = false

  _$init(props?: Record<string, any>, content?: any, children?: AnyDLNode[]) {
    // ---- Add props
    if (content) this._$setContent(content)
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this._$initProp(key, value)
      })
    }
    if (children) {
      (this as AnyDLNode)._$children = children
    }

    // ---- Add envs
    Object.entries(DLStore.envs).forEach(([key, [value, envNode]]) => {
      envNode.updateNodes.add(this)
      this._$initEnv(key, value, envNode)
    })

    // ---- init
    ;(this as AnyDLNode).willMount?.()
    ;(this as AnyDLNode)._$nodes = (this as AnyDLNode).Body?.() ?? []
    ;(this as AnyDLNode).didMount?.()

    this._$initd = true
  }

  _$initProp(name: string, value: any) {
    if (!(`$p$${name}` in this)) return
    ;(this as AnyDLNode)[name] = value
  }

  _$setProp(name: string, value: any) {
    if (!(`$p$${name}` in this)) return
    ;(this as AnyDLNode)[name] = value
  }

  _$initEnv(name: string, value: any, envNode: EnvNode) {
    if (!(`$e$${name}` in this)) return
    ;(this as AnyDLNode)[name] = value
    ;(this as AnyDLNode)[`$en$${name}`] = envNode
  }

  _$updateEnv(name: string, value: any, envNode: EnvNode) {
    if (!(`$e$${name}` in this)) return
    // ---- Make sure the envNode is the innermost envNode that contains this env
    if (envNode !== (this as AnyDLNode)[`$en$${name}`]) return
    ;(this as AnyDLNode)[name] = value
  }

  _$setContent(value: any) {
    const contentKey = (this as AnyDLNode)._$contentKey
    if (!contentKey) return
    if ((this as AnyDLNode)[contentKey] === value) return
    ;(this as AnyDLNode)[contentKey] = value
  }

  _$updateProp(key: string, value: any) {
    const valueKey = `$${key}`
    if ((this as AnyDLNode)[valueKey] === value) return
    ;(this as AnyDLNode)[valueKey] = value
    // ---- Update properties that depend on this property
    ;(this as AnyDLNode)[`$s$${key}`]?.forEach((k: string) => {
      // ---- Not time consuming at all
      if (`$w$${k}` in (this as AnyDLNode)) {
        if (!this._$initd) return
        // ---- Watcher
        (this as AnyDLNode)[k]()
      } else {
        (this as AnyDLNode)[`$${k}`] = (this as AnyDLNode)[`$f$${k}`]
      }
    })
    // ---- Run update function
    ;(this as AnyDLNode)._$update?.((this as AnyDLNode)[`$$${key}`])
  }
}

export const View = CompNode as any
