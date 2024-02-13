import { DLNode, DLNodeType } from "./DLNode"
import { forwardHTMLProp } from "./HTMLNode"
import { DLStore, cached } from "./store"

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
    if (content) this._$setContent(() => content[0], content[1])
    if (props)
      props.forEach(([key, value, deps]) => {
        this._$setProp(key, () => value, deps)
      })
    if (children) this._$children = children

    // Add envs
    DLStore.global.DLEnvStore &&
      Object.entries(DLStore.global.DLEnvStore.envs).forEach(
        ([key, [value, envNode]]) => {
          if (!(`$e$${key}` in this)) return
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
      // ---- Run watcher
      if (key.startsWith("$w$")) return this[key.slice(3)]()
      // ---- Run model update
      if (key.startsWith("$md$")) return this[key.slice(4)]._$update()
      // ---- Run derived value
      if (key.startsWith("$f$")) {
        const realKey = key.slice(3)
        this[realKey] = this[key]
        this._$updateProp(realKey)
      }
    })
    delete this._$notInitd
  }

  /**
   * @brief Set all the props to forward
   * @param key
   * @param value
   * @param deps
   */
  _$setPropToForward(key, value, deps) {
    this._$forwardPropsSet.forEach(node => {
      const isContent = key === "_$content"
      if (node._$dlNodeType === DLNodeType.Comp) {
        if (isContent) node._$setContent(() => value, deps)
        else node._$setProp(key, () => value, deps)
        return
      }
      if (node instanceof HTMLElement) {
        if (isContent) key = "textContent"
        forwardHTMLProp(node, key, () => value, deps)
      }
    })
  }

  /**
   * @brief Define forward props
   * @param key
   * @param value
   */
  _$setForwardProp(key, valueFunc, deps) {
    const notInitd = "_$notInitd" in this
    if (!notInitd && this._$cache(key, deps)) return
    const value = valueFunc()
    if (key === "_$content" && this._$contentKey) {
      this[this._$contentKey] = value
      this._$updateProp(this._$contentKey)
    }
    this[key] = value
    this._$updateProp(key)
    if (notInitd) this._$forwardPropsId.push(key)
    else this._$setPropToForward(key, value, deps)
  }

  /**
   * @brief Add a node to the set of nodes that are forwarding props to this node and init these props
   * @param node
   */
  _$addForwardProps(node) {
    this._$forwardPropsSet.add(node)
    this._$forwardPropsId.forEach(key => {
      this._$setPropToForward(key, this[key], [])
    })
    DLNode.addWillUnmount(
      node,
      this._$forwardPropsSet.delete.bind(this._$forwardPropsSet, node)
    )
  }

  /**
   * @brief Cache the deps and return true if the deps are the same as the previous deps
   * @param key
   * @param deps
   * @returns
   */
  _$cache(key, deps) {
    if (!deps || !deps.length) return false
    const cacheKey = `$cc$${key}`
    if (cached(deps, this[cacheKey])) return true
    this[cacheKey] = deps
    return false
  }

  /**
   * @brief Set the content prop, the key is stored in _$contentKey
   * @param value
   */
  _$setContent(valueFunc, deps) {
    if ("_$forwardProps" in this)
      return this._$setForwardProp("_$content", valueFunc, deps)
    const contentKey = this._$contentKey
    if (!contentKey) return
    if (this._$cache(contentKey, deps)) return
    this[contentKey] = valueFunc()
    this._$updateProp(contentKey)
  }

  /**
   * @brief Set a prop directly, if this is a forwarded prop, go and init forwarded props
   * @param key
   * @param value
   * @param deps
   */
  _$setProp(key, valueFunc, deps) {
    if ("_$forwardProps" in this)
      return this._$setForwardProp(key, valueFunc, deps)
    if (!(`$p$${key}` in this)) {
      console.warn(`[${key}] is not a prop in ${this.constructor.name}`)
      return
    }
    if (this._$cache(key, deps)) return
    this[key] = valueFunc()
    this._$updateProp(key)
  }

  /**
   * @brief Init an env, put the corresponding innermost envNode in $en$key
   * @param key
   * @param value
   * @param envNode
   */
  _$initEnv(key, value, envNode) {
    this[key] = value
    this[`$en$${key}`] = envNode
  }

  // ---- Update functions
  /**
   * @brief Update an env, called in EnvNode._$update
   * @param key
   * @param value
   * @param envNode
   */
  _$updateEnv(key, value, envNode) {
    if (!(`$e$${key}` in this)) return
    if (envNode !== this[`$en$${key}`]) return
    this[key] = value
    this._$updateProp(key)
  }

  /**
   * @brief Update a prop
   */
  _$ud(exp, key) {
    this._$updateDerived(key)
    return exp
  }

  /**
   * @brief Update properties that depend on this property
   * @param key
   */
  _$updateDerived(key) {
    if ("_$notInitd" in this) return
    // ---- "trigger-view"
    if (!this["_$updatingSet"]) this["_$updatingSet"] = new Set()
    if (`$$${key}` in this) this["_$updatingSet"].add(this[`$$${key}`])

    this[`$s$${key}`]?.forEach(k => {
      if (`$w$${k}` in this) {
        // ---- Watcher
        this[k](key)
      } else if (`$md$${k}` in this) {
        this[k]._$update()
      } else {
        // ---- Regular derived value
        this[k] = this[`$f$${k}`]
      }
    })
  }

  /**
   * @brief Update View related update function
   * @param key
   */
  _$updateView() {
    // ---- Trigger parent view
    if (this._$model) {
      this._$model._$updateProp(this._$modelKey)
      return
    }
    const depNums = this["_$updatingSet"]
    if (!depNums) return
    if (depNums.size > 0) {
      const depNum = Array.from(depNums).reduce((acc, cur) => acc | cur, 0)
      this._$update?.(depNum)
    }
    // ---- "trigger-value"
    delete this["_$updatingSet"]
  }

  /**
   * @brief Update a specific prop
   * @param key
   */
  _$updateProp(key) {
    this._$updateDerived(key)
    this._$updateView(key)
  }

  /**
   * @brief Update all props and content of the model
   */
  static _$updateModel(model, propsFunc, contentFunc) {
    const props = propsFunc() ?? {}
    const collectedProps = props.s ?? []
    props.m?.forEach(([props, deps]) => {
      Object.entries(props).forEach(([key, value]) => {
        collectedProps.push([key, value, deps])
      })
    })
    collectedProps.forEach(([key, value, deps]) => {
      model._$setProp(key, () => value, deps)
    })
    const content = contentFunc()
    if (content) model._$setContent(() => content[0], content[1])
  }

  /**
   * @brief Inject Dlight model in to a property
   * @param ModelCls
   * @param props { m: [props, deps], s: [key, value, deps] }
   * @param content
   * @param key
   * @returns
   */
  _$injectModel(ModelCls, propsFunc, contentFunc, key) {
    const props = propsFunc() ?? {}
    const collectedProps = props.s ?? []
    props.m?.forEach(([props, deps]) => {
      Object.entries(props).forEach(([key, value]) => {
        collectedProps.push([key, value, deps])
      })
    })
    const model = new ModelCls()
    model._$init(collectedProps, contentFunc(), null, null)
    model._$model = this
    model._$modelKey = key
    model._$update = CompNode._$updateModel.bind(
      null,
      model,
      propsFunc,
      contentFunc
    )

    return model
  }
}

// ---- @View -> class Comp extends View
export const View = CompNode
export const Model = CompNode

/**
 * @brief Run all update functions given the key
 * @param dlNode
 * @param key
 */
export function update(dlNode, key) {
  dlNode._$updateProp(key)
}
