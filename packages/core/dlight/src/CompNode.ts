import { DLNode, DLNodeType } from "./DLNode"
import { EnvStore, type EnvNode } from "./EnvNode"
import { forwardHTMLProp } from "./HTMLNode"
import { type AnyDLNode } from "./types"

export class CompNode extends DLNode {
  /**
   * @brief Constructor, Comp type
   * @internal
   *  * key - getter: return $key
   *  * key - setter: set $key, update $s$key, call update function with $$key
   *  * $key - private property key
   *  * $$key - dependency number, e.g. 0b1, 0b10, 0b100
   *  * $s$key - set of properties that depend on this property
   *  * $p$key - exist if this property is a prop
   *  * $e$key - exist if this property is an env
   *  * $en$key - exist if this property is an env, and it's the innermost env that contains this env
   *  * $w$key - exist if this property is a watcher
   *  * $f$key - a function that returns the value of this property, called when the property's dependencies change
   *  * _$children - children nodes of type PropView
   *  * _$contentKey - the key key of the content prop
   *  * _$forwardProps - exist if this node is forwarding props
   *  * _$forwardPropsId - the keys of the props that this node is forwarding, collected in _$initForwardProps
   *  * _$forwardPropsSet - contain all the nodes that are forwarding props to this node, collected with _$addForwardProps
   */
  constructor() {
    super(DLNodeType.Comp)
  }

  /**
   * @brief Init function, called explicitly in the subclass's constructor
   * @param props
   * @param content
   * @param children
   * @param forwardPropsScope
   */
  _$init(
    props?: Record<string, any>,
    content?: any,
    children?: AnyDLNode[],
    forwardPropsScope?: CompNode
  ): void {
    // ---- Add props
    // ---- Forward props first to allow internal props to override forwarded props
    if (forwardPropsScope) forwardPropsScope._$addForwardProps(this)
    if (content) this._$setContent(content)
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this._$setProp(key, value)
      })
    }
    if (children) (this as AnyDLNode)._$children = children

    // ---- Add envs
    Object.entries(EnvStore.envs).forEach(([key, [value, envNode]]) => {
      // ---- Add this node to every envNode's updateNodes
      envNode.updateNodes.add(this)
      this._$initEnv(key, value, envNode)
    })

    // ---- init
    ;(this as AnyDLNode).willMount?.()
    this._$nodes = (this as AnyDLNode).View?.() ?? []
    ;(this as AnyDLNode).didMount?.()

    // ---- Remove _$forwardPropsId to save memory, because it's only used in _$addForwardProps phase
    if ("_$forwardPropsId" in this) delete (this as AnyDLNode)._$forwardPropsId
  }

  /**
   * @brief Define forward props
   * @param key
   * @param value
   */
  _$initForwardProps(key: string, value: any): void {
    // ---- If the prop is already defined, don't forward it
    if (key in this) return
    ;(this as AnyDLNode)._$forwardPropsId.push(key)
    ;(this as AnyDLNode)[`$${key}`] = value
    Object.defineProperty(this, key, {
      get() {
        return this[`$${key}`]
      },
      set(value) {
        if (this[`$${key}`] === value) return
        this[`$${key}`] = value
        // ---- Don't need to call update function because the prop is not a explicit dependency
        this._$setForwardProp(key, value)
      },
    })
  }

  /**
   * @brief Add a node to the set of nodes that are forwarding props to this node and init these props, called
   *  1. HTMLNode: explicitly in the View function
   *  2. CompNode: passed in the node's constructor and called in _$init to make sure it's added before the node is mounted
   * @param node
   */
  _$addForwardProps(node: AnyDLNode): void {
    // ---- Add node to the set of nodes that are forwarding props to this node
    ;(this as AnyDLNode)._$forwardPropsSet.add(node)
    // ---- Init these forwarded props
    ;(this as AnyDLNode)._$forwardPropsId.forEach((key: string) => {
      const value = (this as AnyDLNode)[key]
      ;(this as AnyDLNode)._$forwardPropsSet?.forEach((node: AnyDLNode) => {
        // ---- Directly set the prop if it's a CompNode
        if (node._$dlNodeType === DLNodeType.Comp) node[key] = value
        // ---- Different behavior for HTMLNode according to the key
        if (node instanceof HTMLElement) forwardHTMLProp(node, key, value)
      })
    })
    // ---- Remove current node from the set of forwarding nodes when it's unmounted
    const prevWillUnmount = node.willUnmount
    node.willUnmount = () => {
      ;(this as AnyDLNode)._$forwardPropsSet.delete(node)
      prevWillUnmount?.()
    }
  }

  /**
   * @brief Set a prop directly, if this is a forwarded prop, go and init forwarded props
   * @param key
   * @param value
   */
  _$setProp(key: string, value: any): void {
    if ("_$forwardProps" in this) this._$initForwardProps(key, value)
    if (!(`$p$${key}` in this)) return
    ;(this as AnyDLNode)[key] = value
  }

  /**
   * @brief Init an env, put the corresponding innermost envNode in $en$key
   * @param key
   * @param value
   * @param envNode
   */
  _$initEnv(key: string, value: any, envNode: EnvNode): void {
    if (!(`$e$${key}` in this)) return
    ;(this as AnyDLNode)[key] = value
    ;(this as AnyDLNode)[`$en$${key}`] = envNode
  }

  /**
   * @brief Update an env, called in EnvNode._$update
   * @param key
   * @param value
   * @param envNode
   */
  _$updateEnv(key: string, value: any, envNode: EnvNode): void {
    if (!(`$e$${key}` in this)) return
    // ---- Make sure the envNode is the innermost envNode that contains this env
    if (envNode !== (this as AnyDLNode)[`$en$${key}`]) return
    ;(this as AnyDLNode)[key] = value
  }

  /**
   * @brief Set the content prop, the key is stored in _$contentKey
   * @param value
   * @returns
   */
  _$setContent(value: any) {
    const contentKey = (this as AnyDLNode)._$contentKey
    if (!contentKey) return
    if ((this as AnyDLNode)[contentKey] === value) return
    ;(this as AnyDLNode)[contentKey] = value
  }

  /**
   * @brief Update a prop and call any related update function
   * @param key
   * @param value
   */
  _$updateProp(key: string, value: any): void {
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

// ---- @View -> class Comp extends View
export const View = CompNode as any
