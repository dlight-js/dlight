import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { type EnvNode } from "./EnvNode"
import { classNameJoin } from "./utils"

export class HtmlNode extends DLNode {
  _$envNodes: EnvNode[] = []

  constructor(id: string) {
    super(DLNodeType.HTML, id)
  }

  _$init(): void {
    this._$bindNodes()
  }

  _$addElement(element: HTMLElement) {
    this._$el = element
  }

  _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      this._$el[key] = valueOrFunc
      return
    }
    let prevValue: any
    this._$el[key] = prevValue
    dlScope!._$addDeps(listenDeps, () => {
      const newValue = valueOrFunc()
      if (prevValue !== newValue) {
        this._$el[key] = newValue
        prevValue = newValue
      }
    }, this)
  }

  _$addClassName(valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      const classNames = this._$el.className
      const newClassNames = classNameJoin(valueOrFunc)
      this._$el.className = classNames.length === 0 ? newClassNames : `${classNames} ${newClassNames}`
      return
    }
    let prevValue: any
    // const classNames = this._$el.className
    // this._$el.className = classNames.length === 0 ? prevValue : `${classNames} ${prevValue}`

    dlScope!._$addDeps(listenDeps, () => {
      const newValue = valueOrFunc()
      if (prevValue !== newValue) {
        const classNames = this._$el.className
        let newClassName = classNames
        if (prevValue !== "" && classNames.includes(prevValue)) {
          newClassName = newClassName.replace(prevValue, newValue)
        } else {
          newClassName += ` ${newValue}`
        }
        const className = newClassName.trim()
        if (className === "") {
          this._$el.removeAttribute("class")
        } else {
          this._$el.className = className
        }
        prevValue = newValue
      }
    }, this)
  }

  _$addAttributes(attributeMap: Record<string, any> | (() => Record<string, any>), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      for (const [attr, func] of Object.entries(attributeMap)) {
        this._$el.setAttribute(attr, func)
      }
      return
    }
    let prevValue = (attributeMap as any)()
    for (const [attr, func] of Object.entries(prevValue)) {
      this._$el.setAttribute(attr, func)
    }
    dlScope!._$addDeps(listenDeps, () => {
      const newValue = (attributeMap as any)()
      if (prevValue !== newValue) {
        for (const [attr, func] of Object.entries(newValue)) {
          this._$el.setAttribute(attr, func)
        }
        prevValue = newValue
      }
    }, this)
  }

  _$addEvent(eventName: string, func: () => void) {
    this._$el.addEventListener(eventName, func)
  }

  _$addEvents(eventMap: Record<string, () => void>) {
    for (const [eventName, func] of Object.entries(eventMap)) {
      this._$addEvent(eventName, func)
    }
  }

  _$addStyle(valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      for (const [k, v] of Object.entries(valueOrFunc)) {
        this._$el.style[k] = v
      }
      return
    }
    let prevValue: any = valueOrFunc()
    for (const [k, v] of Object.entries(prevValue)) {
      this._$el.style[k] = v
    }
    dlScope!._$addDeps(listenDeps, () => {
      const newValue = valueOrFunc()
      if (prevValue !== newValue) {
        for (const [k, v] of Object.entries(newValue)) {
          this._$el.style[k] = v
        }
        prevValue = newValue
      }
    }, this)
  }

  // ---- lifecycles
  _$addLifeCycle(func: (_el: HTMLElement, _node: HtmlNode) => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
    const preLifeCycle = (this as any)[lifeCycleName] ?? (() => {})
    ;(this as any)[lifeCycleName] = function(_el: HTMLElement, _node: HtmlNode) {
      preLifeCycle.call(this, _el, _node)
      func.call(this, _el, _node)
    }
  }

  _$addAnyProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
      this._$addLifeCycle(valueOrFunc, key as any)
      return
    }
    if (key === "style") {
      this._$addStyle(valueOrFunc, dlScope, listenDeps)
      return
    }
    if (key === "className") {
      this._$addClassName(valueOrFunc, dlScope, listenDeps)
      return
    }
    if (key === "_$content") {
      this._$addProp("innerText", valueOrFunc, dlScope, listenDeps)
      return
    }
    if (key === "addEvents") {
      this._$addEvents(valueOrFunc)
      return
    }
    if (key === "setAttributes") {
      this._$addAttributes(valueOrFunc, dlScope, listenDeps)
      return
    }
    if (key.startsWith("on")) {
      this._$addEvent(key.slice(2), valueOrFunc)
      return
    }
    this._$addProp(key, valueOrFunc, dlScope, listenDeps)
  }
}
