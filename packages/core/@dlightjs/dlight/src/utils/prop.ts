import { type CustomNode, type EnvNode } from "../Nodes"

function addToDepChain(dlNode: CustomNode, key: string, defaultValue: any) {
  (dlNode as any)[`_$$${key}`] = defaultValue
  Object.defineProperty(dlNode, key, {
    get() {
      return this[`_$$${key}`]
    },
    set(value: any) {
      this._$updateProperty(key, value)
    }
  })
  if (!dlNode._$deps) dlNode._$deps = {}
  dlNode._$deps[key] = new Set()
}

export function addDLProp(dlNode: CustomNode, tag: "env" | "prop", key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
  if (dlNode?._$forwardProps && tag === "prop") {
    forwardDLProp(dlNode, key, propFunc, dlScope, listenDeps)
    return
  }
  if (!(key in dlNode)) return
  if (!listenDeps) {
    (dlNode as any)[key] = propFunc
    return
  }

  if ((dlNode as any)[`_$$$${key}`] !== tag) {
    // ---- 不是prop或env，或者不匹配
    return
  }

  addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
}

export function forwardDLProp(dlNode: CustomNode, key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
  (dlNode as any)[`_$$$${key}`] = "prop"
  addToDepChain(dlNode, key, listenDeps ? propFunc() : propFunc)
  if (listenDeps) {
    addOneWayDLProp(dlScope!, dlNode, key, propFunc, listenDeps)
  }
}

export function addOneWayDLProp(dlScope: CustomNode, dlNode: CustomNode | EnvNode, key: string, propFunc: () => any, listenDeps: string[]) {
  ;(dlNode as any)[key] = propFunc()
  dlScope._$addDeps(listenDeps, () => {
    (dlNode as any)[key] = propFunc()
  }, dlNode)
}
