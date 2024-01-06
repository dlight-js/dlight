import { DLNode, DLNodeType } from "./DLNode"
import { forwardHTMLProp } from "./HTMLNode"
import { DLStore } from "./store"

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
   *  * _$forwardPropsId - the keys of the props that this node is forwarding, collected in _$setForwardProp
   *  * _$forwardPropsSet - contain all the nodes that are forwarding props to this node, collected with _$addForwardProps
   */
  constructor() {
    super(DLNodeType.Comp)
  }

  /**
   * @brief Init function, called explicitly in the subclass's constructor
   * @param props - Object containing properties
   * @param content - Content to be used
   * @param children - Child nodes
   * @param forwardPropsScope - Scope for forwarding properties
   */
  _$init(props, content, children, forwardPropsScope) {
    this._$notInitd = true

    // Forward props first to allow internal props to override forwarded props
    if (forwardPropsScope) forwardPropsScope._$addForwardProps(this)
    if (content !== null) this._$setContent(content)
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        this._$setProp(key, value)
      })
    }
    if (children) this._$children = children

    // Add envs
    DLStore.global.DLEnvStore &&
      Object.entries(DLStore.global.DLEnvStore.envs).forEach(
        ([key, [value, envNode]]) => {
          envNode.addNode(this)
          this._$initEnv(key, value, envNode)
        }
      )

    // Call watchers
    this._$callUpdatesBeforeInit()
    this.didMount && DLNode.addDidMount(this, this.didMount.bind(this))
    this.willUnmount && DLNode.addWillUnmount(this, this.willUnmount.bind(this))
    this.didUnmount && DLNode.addDidUnmount(this, this.didUnmount.bind(this))

    this.willMount?.()
    this._$nodes = this.View?.() ?? []
  }

  /**
   * @brief Call updates manually before the node is mounted
   */
  _$callUpdatesBeforeInit() {
    const protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    const ownProps = Object.getOwnPropertyNames(this)
    const allProps = [...protoProps, ...ownProps]
    allProps.forEach(key => {
      if (key.startsWith("$w$")) return this[key.slice(3)]()
      if (key.startsWith("$f$")) {
        this[`$${key.slice(3)}`] = this[key]
      }
    })
    delete this._$notInitd
  }

  /**
   * @brief Define forward props
   * @param key
   * @param value
   */
  _$setForwardProp(key, value) {
    if (key in this) {
      this[key] = value
      return
    }
    this._$forwardPropsId.push(key)
    const valueKey = `$${key}`
    this[valueKey] = value
    Object.defineProperty(this, key, {
      get() {
        return this[valueKey]
      },
      set(value) {
        if (this[valueKey] === value) return
        this[valueKey] = value
        this._$forwardPropsSet?.forEach(node => {
          if (node._$dlNodeType === DLNodeType.Comp) node._$setProp(key, value)
          if (node instanceof HTMLElement) forwardHTMLProp(node, key, value)
        })
      },
    })
  }

  /**
   * @brief Add a node to the set of nodes that are forwarding props to this node and init these props
   * @param node
   */
  _$addForwardProps(node) {
    this._$forwardPropsSet.add(node)
    this._$forwardPropsId.forEach(key => {
      const value = this[key]
      this._$forwardPropsSet?.forEach(node => {
        if (node._$dlNodeType === DLNodeType.Comp) {
          if ("_$forwardProps" in node) node._$forwardPropsId.push(key)
          node._$setProp(key, value)
        }
        if (node instanceof HTMLElement) forwardHTMLProp(node, key, value)
      })
    })
    DLNode.addWillUnmount(
      node,
      this._$forwardPropsSet.delete.bind(this._$forwardPropsSet, node)
    )
  }

  /**
   * @brief Set a prop directly, if this is a forwarded prop, go and init forwarded props
   * @param key
   * @param value
   */
  _$setProp(key, value) {
    if ("_$forwardProps" in this) this._$setForwardProp(key, value)
    if (!(`$p$${key}` in this)) return
    this[key] = value
  }

  /**
   * @brief Init an env, put the corresponding innermost envNode in $en$key
   * @param key
   * @param value
   * @param envNode
   */
  _$initEnv(key, value, envNode) {
    if (!(`$e$${key}` in this)) return
    this[key] = value
    this[`$en$${key}`] = envNode
  }

  /**
   * @brief Update an env, called in EnvNode._$update
   * @param key
   * @param value
   * @param envNode
   */
  _$updateEnv(key, value, envNode) {
    if (!(`$e$${key}` in this)) return
    if (envNode !== this[`$en$${key}`]) return
    if (this[key] === value) return
    this[key] = value
  }

  /**
   * @brief Set the content prop, the key is stored in _$contentKey
   * @param value
   */
  _$setContent(value) {
    const contentKey = this._$contentKey
    if (!contentKey) return
    if (this[contentKey] === value) return
    this[contentKey] = value
  }

  /**
   * @brief Update a prop and call any related update function
   * @param key
   * @param value
   */
  _$updateProp(key, value) {
    const valueKey = `$${key}`
    if (this[valueKey] === value) return
    const prevValue = this[valueKey]
    this[valueKey] = value
    this._$updateDerived(key)
    this._$updateView(key, prevValue, value)
  }

  /**
   * @brief Update properties that depend on this property
   * @param key
   */
  _$updateDerived(key) {
    if ("_$notInitd" in this) return
    this[`$s$${key}`]?.forEach(k => {
      if (`$w$${k}` in this) {
        this[k]()
      } else {
        this[`$${k}`] = this[`$f$${k}`]
      }
    })
  }

  /**
   * @brief Update View related update function
   * @param key
   */
  _$updateView(key, prevValue, newValue) {
    const depNum = this[`$$${key}`]
    if (!depNum) return
    this._$update?.(depNum, key, prevValue, newValue)
  }
}

// ---- @View -> class Comp extends View
export const View = CompNode

/**
 * @brief Run all update functions given the key
 * @param dlNode
 * @param key
 */
export function update(dlNode, key) {
  dlNode._$updateDerived(key)
  dlNode._$updateView(key)
}
