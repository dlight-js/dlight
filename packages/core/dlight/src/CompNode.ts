import { DLNode, DLNodeType } from "./DLNode"
import DLStore from "./DLStore"
import { type EnvNode } from "./EnvNode"
import { forwardHTMLProp } from "./HTMLNode"
import { type AnyDLNode } from "./types"

export class CompNode extends DLNode {
  constructor() {
    super(DLNodeType.Comp)
  }

  _$init(
    props?: Record<string, any>,
    content?: any,
    children?: AnyDLNode[],
    forwardPropsScope?: CompNode
  ) {
    // ---- Add props
    if (forwardPropsScope) forwardPropsScope._$addForwardProps(this)
    if (content) this._$setContent(content)
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this._$setProp(key, value)
      })
    }
    if (children) {
      ;(this as AnyDLNode)._$children = children
    }

    // ---- Add envs
    Object.entries(DLStore.envs).forEach(([key, [value, envNode]]) => {
      envNode.updateNodes.add(this)
      this._$initEnv(key, value, envNode)
    })

    // ---- init
    ;(this as AnyDLNode).willMount?.()
    ;(this as AnyDLNode)._$nodes = (this as AnyDLNode).View?.() ?? []
    ;(this as AnyDLNode).didMount?.()

    // ---- Remove _$forwardProps to save memory, because it's only used in _$addForwardProps phase
    if ("_$forwardPropsId" in this) delete (this as AnyDLNode)._$forwardPropsId
  }

  _$initForwardProps(name: string, value: any) {
    if (name in this) return
    ;(this as AnyDLNode)._$forwardPropsId.push(name)
    ;(this as AnyDLNode)[`$${name}`] = value
    Object.defineProperty(this, name, {
      get() {
        return this[`$${name}`]
      },
      set(value) {
        if (this[`$${name}`] === value) return
        this[`$${name}`] = value
        this._$setForwardProp(name, value)
      },
    })
  }

  _$setForwardPropsMap(name: string, value: any) {
    ;(this as AnyDLNode)._$forwardPropsMap?.forEach((node: AnyDLNode) => {
      if ("_$dlNodeType" in node) {
        node[name] = value
      }
      if (node instanceof HTMLElement) {
        forwardHTMLProp(node, name, value)
      }
    })
  }

  _$addForwardProps(node: AnyDLNode) {
    ;(this as AnyDLNode)._$forwardPropsMap.add(node)
    const prevWillUnmount = node.willUnmount
    node.willUnmount = () => {
      ;(this as AnyDLNode)._$forwardPropsMap.delete(node)
      prevWillUnmount?.()
    }
    ;(this as AnyDLNode)._$forwardPropsId.forEach((name: string) => {
      this._$setForwardPropsMap(name, (this as AnyDLNode)[name])
    })
  }

  _$setProp(name: string, value: any) {
    if ("_$forwardProps" in this) this._$initForwardProps(name, value)
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
        // ---- Don't call the watcher before the node is mounted
        if (!(this as AnyDLNode)._$nodes) return
        ;(this as AnyDLNode)[k]()
      } else {
        ;(this as AnyDLNode)[`$${k}`] = (this as AnyDLNode)[`$f$${k}`]
      }
    })
    // ---- Run update function
    const depNum = (this as AnyDLNode)[`$$${key}`]
    if (depNum) (this as AnyDLNode)._$update?.(depNum)
  }
}

export const View = CompNode as any
