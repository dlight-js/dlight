import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { type ValueOrFunc, type AnyDLNode, type AnyValue } from "./type"
import { appendNodes } from "./utils"

export class HtmlNode extends DLNode {
  constructor() {
    super(DLNodeType.HTML)
  }

  /**
   * @brief Init nodes, bind nodes and append els to this._$el
   */
  _$init(): void {
    this._$bindNodes()
    appendNodes(this._$nodes, this._$el)
  }

  /**
   * @brief Create html element
   * @param tag
   */
  t(tag: string) {
    this._$el = document.createElement(tag)
  }

  /**
   * @brief A number to keep track of previous value,
   *  dynamic variable name so that in updateFunc we can use this[preValueName] to get previous value
   *  instead of only using closure which will lead to arrow function only and more compiled code
   */
  preValueCount = 0
  get preValueName() {
    return `prevValue${this.preValueCount++}`
  }

  /**
   * @brief Add html (reactive) properties by calling this._$el[prop_name] = value
   * @param key
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   */
  p(key: string, valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      this._$el[key] = valueOrFunc
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc()
    this._$el[key] = (this as AnyDLNode)[preValueName]
    dlScope._$addDeps(dependencies, this.addPropDep.bind(this, key, valueOrFunc, preValueName), this)
  }

  addPropDep(key: string, valueFunc: () => AnyValue, preValueName: string) {
    const newValue = valueFunc()
    if ((this as AnyDLNode)[preValueName] === newValue) return
    this._$el[key] = newValue
    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add memorized class name, instead of just resetting the className property,
   *  in this method we will use classList.add and classList.remove to allow multiple class names calling
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   */
  c(valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      this._$el.classList.add(valueOrFunc)
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc() ?? ""
    this._$el.classList.add((this as AnyDLNode)[preValueName])
    dlScope._$addDeps(dependencies, this.addClassNameDep.bind(this, valueOrFunc, preValueName), this)
  }

  addClassNameDep(valueFunc: () => string, preValueName: string) {
    const prevValue = (this as AnyDLNode)[preValueName]
    const newValue = valueFunc()
    if (prevValue === newValue) return
    this._$el.classList.remove(prevValue)
    this._$el.classList.add(newValue)
    if (this._$el.classList.length === 0) this._$el.removeAttribute("class")
    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add styles by calling this._$el.style[prop_name] = value
   *  Has a con that when one style is changed, the whole style object will be traversed,
   *  even though we made a check to see if the value is changed, but still slower than just setting the style
   *  so don't set too many styles in one object.
   *  I trust people won't use inline style anyway.
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   */
  s(valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      Object.entries(valueOrFunc).forEach(([k, v]) => {
        this._$el.style[k] = v
      })
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc()
    Object.entries((this as AnyDLNode)[preValueName]).forEach(([k, v]) => {
      this._$el.style[k] = v
    })
    dlScope._$addDeps(dependencies, this.addStyleDep.bind(this, valueOrFunc, preValueName), this)
  }

  addStyleDep(valueFunc: () => Record<string, AnyValue>, preValueName: string) {
    const prevValue = (this as AnyDLNode)[preValueName]
    const newValue = valueFunc()
    const changed: string[] = []
    Object.entries(newValue).forEach(([k, v]) => {
      if (k in prevValue) {
        changed.push(k)
        if (prevValue[k] === v) return
      }
      this._$el.style[k] = v
    })

    Object.entries(prevValue).forEach(([k]) => {
      if (changed.includes(k)) return
      this._$el.style[k] = ""
    })

    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add event listener by calling addEventListener instead of setting onclick, onmouseover, etc.
   *  This way has many advantages like allowing multiple event listeners on one event.
   * @param eventName
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   * @returns
   */
  e(eventName: string, valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      this._$el.addEventListener(eventName, valueOrFunc)
      // this._$el[`on${eventName}`] = (this as AnyDLNode)[valueOrFunc]
      // console.log(this._$el[`on${eventName}`], `on${eventName}`)
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc()
    // this._$el[`on${eventName}`] = (this as AnyDLNode)[preValueName]
    this._$el.addEventListener(eventName, (this as AnyDLNode)[preValueName])
    const updateFunc = this.addEventDep.bind(this, eventName, valueOrFunc, preValueName)
    dlScope._$addDeps(dependencies, updateFunc, this)
  }

  addEventDep(eventName: string, valueFunc: () => void, preValueName: string) {
    const newValue = valueFunc()
    this._$el.removeEventListener(eventName, (this as AnyDLNode)[preValueName])
    this._$el.addEventListener(eventName, newValue)
    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add multiple event listeners all at once,
   *  use this when your event name has some illegal identifier characters like "-"
   *  You won't use this that much, but it's here for completeness.
   * @param valueOrFunc Value like { "my-strange:::event": () => {}, "&&&weird-event": () => {} } "}
   * @param dlScope
   * @param dependencies
   * @returns
   */
  es(valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      Object.entries(valueOrFunc).forEach(([eventName, func]) => {
        this._$el.addEventListener(eventName, func)
      })
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc()
    Object.entries((this as AnyDLNode)[preValueName]).forEach(([eventName, func]) => {
      this._$el.addEventListener(eventName, func)
    })
    const updateFunc = this.addEventsDep.bind(this, valueOrFunc, preValueName)
    dlScope._$addDeps(dependencies, updateFunc, this)
  }

  addEventsDep(eventsFunc: () => Record<string, Event>, preValueName: string) {
    const prevValue = (this as AnyDLNode)[preValueName]
    const newValue = eventsFunc()
    Object.entries(prevValue).forEach(([eventName, func]) => {
      this._$el.removeEventListener(eventName, func)
    })
    Object.entries(newValue).forEach(([eventName, func]) => {
      this._$el.addEventListener(eventName, func)
    })
    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add attributes to html element instead of adding properties,
   *  only legal properties will be displayed in DOM,
   *  attributes however can be anything, like "my-attr", "&&&weird-attr", etc.
   *  This function also designed to add multiple attributes at once.
   *  You won't use this that much neither, but we still have it for you.
   * @param valueOrFunc { "my-attr": () => {}, "&&&weird-attr": () => {} }
   * @param dlScope
   * @param dependencies
   * @returns
   */
  a(valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      Object.entries(valueOrFunc).forEach(([attr, func]) => {
        this._$el.setAttribute(attr, func)
      })
      return
    }
    const preValueName = this.preValueName
    ;(this as AnyDLNode)[preValueName] = valueOrFunc()
    Object.entries((this as AnyDLNode)[preValueName]).forEach(([attr, func]) => {
      this._$el.setAttribute(attr, func)
    })
    const updateFunc = this.addAttributesDep.bind(this, valueOrFunc, preValueName)
    dlScope._$addDeps(dependencies, updateFunc, this)
  }

  addAttributesDep(attributeMapFunc: () => Record<string, AnyValue>, preValueName: string) {
    const prevValue = (this as AnyDLNode)[preValueName]
    const newValue = attributeMapFunc()
    if (prevValue === newValue) return
    Object.entries(prevValue).forEach(([attr, func]) => {
      this._$el.setAttribute(attr, func)
    })
    ;(this as AnyDLNode)[preValueName] = newValue
  }

  /**
   * @brief Add lifecycle functions, willAppear, didAppear, willDisappear, didDisappear
   *  Calling order:
   *       willAppear
   *    -> (element is appended in DOM)
   *    -> didAppear
   *    -> (whatever non-related thing you do)
   *    -> willDisappear
   *    -> (element is removed from DOM)
   *    -> didDisappear
   * @param lifecycle
   * @param prevLifecycle
   */
  l(
    func: (el: HTMLElement, node: DLNode) => void,
    lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear"
  ) {
    (this as AnyDLNode)[lifeCycleName] =
    this.bindLifecycleFunc.bind(this, func, (this as AnyDLNode)[lifeCycleName])
  }

  bindLifecycleFunc(
    lifecycle: (el: HTMLElement, dlNode: DLNode) => void,
    prevLifecycle: (el: HTMLElement, dlNode: DLNode) => void
  ) {
    prevLifecycle?.(this._$el, this)
    lifecycle(this._$el, this)
  }

  /**
   * @brief Add any property to html element, merge all the above functions into one
   *  Used in dynamic components that forwardProps.
   * @param key
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   * @returns
   */
  addAnyValue(key: string, valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (key === "willAppear" || key === "didAppear" || key === "willDisappear" || key === "didDisappear") {
      return this.l(valueOrFunc, key)
    }
    if (key === "style") return this.s(valueOrFunc, dlScope, dependencies)
    if (key === "class") return this.c(valueOrFunc, dlScope, dependencies)
    if (key === "_$content") return this.p("innerText", valueOrFunc, dlScope, dependencies)
    if (key === "events") return this.es(valueOrFunc, dlScope, dependencies)
    if (key === "attributes") return this.a(valueOrFunc, dlScope, dependencies)
    if (key.startsWith("on")) return this.e(key.slice(2).toLowerCase(), valueOrFunc, dlScope, dependencies)
    this.p(key, valueOrFunc, dlScope, dependencies)
  }
}
