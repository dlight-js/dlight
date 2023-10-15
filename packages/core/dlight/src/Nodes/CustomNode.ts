import { type EnvNode } from "./EnvNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { HtmlNode } from "../Nodes"

export class CustomNode extends DLNode {
  _$envNodes?: EnvNode[]
  _$derivedPairs?: Record<string, string[]>

  constructor() {
    super(DLNodeType.Custom)
  }

  get _$children(): DLNode[] {
    return this._$childrenFuncs()
  }

  _$childrenFuncs: () => DLNode[] = () => []

  _$addChildren(dlNodeFuncs: () => DLNode[]) {
    this._$childrenFuncs = dlNodeFuncs
  }

  // ---- dep
  _$initDecorators() {
    if (this._$derivedPairs) {
      // ---- traverse _$derivedPairs, derived变量监听的变量的change函数挂载到被监听变量上
      for (const [propertyKey, listenDeps] of Object.entries(this._$derivedPairs)) {
        const key = `_$$${propertyKey}` in this ? `_$$${propertyKey}` : propertyKey
        const func = (this as any)[key]
        if (func === "Watcher") {
          const watcher = (this as any)[propertyKey]
          watcher()
          this._$addDeps(listenDeps, watcher)
          continue
        }

        const isDerived = typeof func === "function"
        if (!isDerived) {
          (this as any)[key] = func
          continue
        }
        (this as any)[key] = func()

        let prevValue = (this as any)[propertyKey]
        this._$addDeps(listenDeps, () => {
          const newValue = func()
          if (newValue === prevValue) return
          ;(this as any)[`_$$${propertyKey}`] = newValue
          prevValue = newValue
        })
      }
    }
  }

  _$updateProperty(key: string, value: any) {
    if ((this as any)[`_$$${key}`] === value) return
    (this as any)[`_$$${key}`] = value
    this._$runDeps(key)
  }

  _$runDeps(key: string) {
    for (const func of (this as any)[`_$$${key}Deps`]) {
      func()
    }
  }

  _$addDeps(deps: string[], func: (newValue?: any) => any, dlNode?: DLNode) {
    for (const dep of deps) {
      (this as any)[`_$$${dep}Deps`].add(func)
    }
    if (dlNode) this._$deleteDeps(deps, func, dlNode)
  }

  _$deleteDeps(deps: string[], func: (newValue?: any) => any, dlNode: any) {
    if (!dlNode._$cleanUps) dlNode._$cleanUps = []
    dlNode._$cleanUps.push(() => {
      for (const dep of deps) {
        (this as any)[`_$$${dep}Deps`].delete(func)
      }
    })
  }

  _$resetDeps() {
    for (const key of Object.getOwnPropertyNames(this)) {
      if (!(key.startsWith("_$$") && key.endsWith("Deps"))) continue
      ;(this as any)[key] = new Set()
    }
  }

  _$init() {
    this._$initDecorators()
    this.willMount(this._$el, this)
    this._$nodes = ((this as any).Body.bind(this) ?? (() => []))()
    this._$bindNodes()
    this.didMount(this._$el, this)
  }

  _$addProp(key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    addDLProp(this, "prop", key, propFunc, dlScope, listenDeps)
  }

  _$addDefaultProp(key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    addDLProp(this, "prop", (this as any)._$defaultProp ?? "_$content", propFunc, dlScope, listenDeps)
  }

  // ---- lifecycles
  willMount(_els: HTMLElement[], _node: CustomNode) { }
  didMount(_els: HTMLElement[], _node: CustomNode) { }
  willUnmount(_els: HTMLElement[], _node: CustomNode) { }
  didUnmount(_els: HTMLElement[], _node: CustomNode) { }

  _$addLifeCycle(func: (_els: HTMLElement[], _node: CustomNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
    const preLifeCycle = this[lifeCycleName]
    if (["willMount", "willUnmount"].includes(lifeCycleName)) {
      // ---- outside in
      this[lifeCycleName] = function(_els: HTMLElement[], _node: CustomNode) {
        func.call(this, this._$el, this)
        preLifeCycle.call(this, this._$el, this)
      }
    } else {
      this[lifeCycleName] = function(_els: HTMLElement[], _node: CustomNode) {
        // ---- inside out
        preLifeCycle.call(this, this._$el, this)
        func.call(this, this._$el, this)
      }
    }
  }

  render(idOrEl: string | HTMLElement) {
    // ----
    if (typeof idOrEl === "string") {
      idOrEl = document.getElementById(idOrEl)!
    }
    idOrEl.innerHTML = ""
    const appNode = new HtmlNode(idOrEl)
    appNode._$addNodes([this])
    appNode._$init()
  }

  _$forwardProps = false
  forwardProps(dlNode: CustomNode | HtmlNode) {
    const members = [...new Set(
      Object.getOwnPropertyNames(this)
        .filter(m => (this as any)[m] === "prop")
        .map(m => m.replace(/^_\$\$\$*/, ""))
    )]
    for (const member of members) {
      if (dlNode._$nodeType === DLNodeType.HTML) {
        (dlNode as HtmlNode)._$addAnyProp(member, () => (this as any)[member], this, [member])
      } else {
        dlNode._$addProp(member, () => (this as any)[member], this, [member])
      }
    }

    if (dlNode._$nodeType === DLNodeType.Custom) {
      (dlNode as CustomNode)._$childrenFuncs = this._$childrenFuncs
    } else {
      (dlNode as HtmlNode)._$nodes = this._$children
    }
  }
}
