import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { type ValueOrFunc, type AnyDLNode, type AnyValue } from "./type"
import { type HtmlNode } from "./HtmlNode"

export class CustomNode extends DLNode {
  constructor() {
    super(DLNodeType.Custom)
  }

  /**
   * @brief Initialize the CustomNode
   */
  _$init(): void {
    this._$initDecorators()
    ;(this as AnyDLNode).willMount?.call(this)
    this._$nodes = (this as AnyDLNode).Body?.call(this) ?? []
    this._$bindNodes()
    ;(this as AnyDLNode).didMount?.call(this)
  }

  /**
   * @brief Handle derived values and their dependencies
   * @derivedPairs Holds the derived keys and their dependencies,
   *  basically a map that do the dep-chain
   *  e.g.
   *  ```js
   *  class A {
   *    count = 1
   *    doubleCount = this.count * 2
   *    description = `The count is ${this.count}`
   *  }
   *  ```
   *  -> _$derivedPairs = { doubleCount: ["count"], description: ["count"] }
   * @key
   *  1. key: getter: return $key
   *          setter: set $key and update dependencies
   *  2. $key: private property key
   *  3. $$key: "prop" / "env"
   *  4. $keyFunc: derived value func
   *  5. $keyDeps: contains to-run dependency functions
   *  6. $keyWatcher: if this property is a watcher
   *  e.g.
   *  ```js
   *  class A {
   *    count = 1
   *    doubleCount = this.count * 2
   *  }
   *  =>
   *  class A {
   *    $count = 1;
   *    $countDeps = new Set();
   *    get count() { return this.$count; }
   *    set count(value) {
   *      if (this.$count === value) return
   *      this.$count = value;
   *      this.$countDeps.forEach((dep) => { dep(); });
   *    }
   *    doubleCount = undefined;
   *    get $$doubleCountFunc() { return this.count * 2; }
   *  }
   * ```
   */
  _$initDecorators() {
    const derivedPairs: Record<string, string[]> = (this as AnyDLNode)._$derivedPairs
    if (!derivedPairs) return

    // ---- Traverse _$derivedPairs and add derived value funcs
    Object.entries(derivedPairs).forEach(([key, listenDeps]) => {
      if ((this as AnyDLNode)[`$${key}Watcher`]) {
        // ---- If it's a watcher, just add the watcher as the update func
        (this as AnyDLNode)[key]()
        this._$addDeps(listenDeps, (this as AnyDLNode)[key].bind(this))
        return
      }

      // ---- The derived value func is stored in $${key}Func
      const funcName = `$${key}Func`
      ;(this as AnyDLNode)[key] = (this as AnyDLNode)[funcName]
      this._$addDeps(listenDeps, this._$addFuncDep.bind(this, key, funcName))
    })

    // ---- Free _$derivedPairs to reduce array size
    delete (this as AnyDLNode)._$derivedPairs
  }

  /**
   * @brief Used in this._$addDeps
   *  Declared as method instead of arrow function to reduce compiled code size
   * @param key Property key
   * @param funcName Property key + "$xxxFunc", declared outside and bind to this to reduce string template call
   */
  _$addFuncDep(key: string, funcName: string) {
    const newValue = (this as AnyDLNode)[funcName]
    if (newValue === (this as AnyDLNode)[key]) return
    ;(this as AnyDLNode)[`$${key}`] = newValue
  }

  /**
   * @brief Add dependency functions according to dependencies and add clean up functions if dlNode is provided
   *  Two scenarios that dlNode is not provided:
   *    1. In initDecorators
   *     Because when "this" is deleted, the dependency functions should be deleted too, no need to add clean up functions
   *    2. Separate addDep and addCleanUpDep
   *     Manually add clean up functions by calling addCleanUpDep in order to keep dependency removal in order
   *     Used in forNode's updateFunc
   * @param deps Dependencies
   * @param func Dependency function
   * @param dlNode DLNode
   */
  _$addDeps(deps: string[], func: <T>(newValue?: T) => void, dlNode?: DLNode) {
    deps.forEach(dep => (this as AnyDLNode)[dep].add(func))
    dlNode && this._$addCleanUpDep(func, dlNode)
  }

  /**
   * @brief Add clean up functions to dlNode, to be cleaned up when dlNode is deleted
   * @param func Same function as the one added to dep set
   * @param dlNode Associated DLNode
   */
  _$addCleanUpDep(func: () => void, dlNode: DLNode) {
    if (!(dlNode as AnyDLNode)._$cleanUps) (dlNode as AnyDLNode)._$cleanUps = []
    ;(dlNode as AnyDLNode)._$cleanUps.push(func)
  }

  /**
   * @brief Add a prop to this CustomNode by simply calling addDLProp and pass "prop" as the type
   * @param key Property key
   * @param propFunc Property function
   * @param dlScope DLNode
   * @param listenDeps Dependencies
   */
  _$addProp(key: string, propFunc: ValueOrFunc, dlScope?: CustomNode, listenDeps?: string[]) {
    addDLProp(this, "prop", key, propFunc, dlScope, listenDeps)
  }

  /**
   * @TODO
   */
  forwardProps(dlNode: CustomNode | HtmlNode) {
    const members = [...new Set(
      Object.getOwnPropertyNames(this)
        .filter(m => (this as AnyDLNode)[m] === "prop")
        .map(m => m.replace(/^\$*/, ""))
    )]
    ;(this as AnyDLNode)._$stateDepArr = members.map(m => `$${m}Func`)
    for (let i = 0; i < members.length; i++) {
      const member = members[i]
      const dependencies = (this as AnyDLNode)._$stateDepArr[i]
      if (dlNode._$nodeType === DLNodeType.HTML) {
        (dlNode as HtmlNode).addAnyValue(member, () => (this as AnyDLNode)[member], this, dependencies)
      } else {
        (dlNode as CustomNode)._$addProp(member, () => (this as AnyDLNode)[member], this, dependencies)
      }
    }

    if (dlNode._$nodeType === DLNodeType.Custom) {
      (dlNode as AnyDLNode)._$childrenFunc = (this as AnyDLNode)._$childrenFunc
    } else {
      (dlNode as HtmlNode)._$nodes = (this as AnyDLNode)._$childrenFunc?.() ?? []
    }
  }

  /**
   * @brief Used in SubView _$addDeps
   *  Declared as method instead of arrow function to reduce compiled code size
   * @param container
   * @param value
   */
  _$updateSubView(container: [AnyValue, string[]], value: AnyValue) {
    container[0] = value
  }
}
