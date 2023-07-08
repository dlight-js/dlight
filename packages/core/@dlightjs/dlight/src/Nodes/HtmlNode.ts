import { DLightStore } from "../store"
import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { type EnvNode } from "./EnvNode"
import { appendEls, classNameJoin } from "./utils"

export class HtmlNode extends DLNode {
  _$envNodes: EnvNode[] = []

  constructor(tagOrEl: string | HTMLElement) {
    super(DLNodeType.HTML)
    this._$el = typeof tagOrEl === "string" ? document.createElement(tagOrEl) : tagOrEl
  }

  _$init(): void {
    this._$bindNodes()
    appendEls(this, this._$nodes)
  }

  _$addNodes(nodes: DLNode[]) {
    this._$nodes = nodes
  }

  _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      this._$el[key] = valueOrFunc
      return
    }
    let prevValue: any = valueOrFunc()
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
      this._$el.className = `${classNames} ${classNameJoin(valueOrFunc)}`
      return
    }
    let prevValue: any = classNameJoin(valueOrFunc())
    const classNames = this._$el.className
    this._$el.className = `${classNames} ${prevValue}`

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
    }
    if (key === "_$content") {
      this._$addProp("innerText", valueOrFunc, dlScope, listenDeps)
      return
    }
    this._$addProp(key, valueOrFunc, dlScope, listenDeps)
  }
}
