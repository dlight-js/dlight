import { DLNode, DLNodeType } from "./DLNode"
import DLStore from "./DLStore"
import { type EnvNode } from "./EnvNode"
import { forwardHTMLProp } from "./HTMLNode"
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

    // ---- Remove _$forwardProps to save memory, because it's only used in _$addForwardProp phase
    if ("_$forwardProp" in this) delete (this as AnyDLNode)._$forwardProps
  }

  _$initForwardProp(name: string, value: any) {
    if (name in this) return
    (this as AnyDLNode)._$forwardProps.push(name)
    ;(this as AnyDLNode)[`$${name}`] = value
    Object.defineProperty(this, name, {
      get() {
        return (this)[`$${name}`]
      },
      set(value) {
        if (this[`$${name}`] === value) return
        this[`$${name}`] = value
        this._$setForwardProp(name, value)
      }
    })
  }

  _$setForwardPropMap(name: string, value: any) {
    ;(this as AnyDLNode)._$forwardPropMap?.forEach((node: AnyDLNode) => {
      if ("_$dlNodeType" in node) {
        node[name] = value
      }
      if (node instanceof HTMLElement) {
        forwardHTMLProp(node, name, value)
      }
    })
  }

  _$addForwardProp(node: AnyDLNode) {
    (this as AnyDLNode)._$forwardPropMap.add(node)
    const prevWillUnmount = node.willUnmount
    node.willUnmount = () => {
      (this as AnyDLNode)._$forwardPropMap.delete(node)
      prevWillUnmount?.()
    }
    ;(this as AnyDLNode)._$forwardProps.forEach((name: string) => {
      this._$setForwardPropMap(name, (this as AnyDLNode)[name])
    })
  }

  _$initProp(name: string, value: any) {
    if ("_$forwardProp" in this) this._$initForwardProp(name, value)
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
    const depNum = (this as AnyDLNode)[`$d$${key}`]
    if (depNum) (this as AnyDLNode)._$update?.(depNum)
  }
}

export const View = CompNode as any
