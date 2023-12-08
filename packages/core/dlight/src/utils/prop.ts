import { type CustomNode } from "../Nodes"
import { type AnyDLNode } from "../Nodes/type"

function addToDep(dlNode: CustomNode, key: string, defaultValue: any) {
  const implicitKey = `$${key}`
  // ---- Skip if already added
  if (implicitKey in (dlNode as AnyDLNode)) return

  const depKey = `${implicitKey}Deps`
  ;(dlNode as AnyDLNode)[implicitKey] = defaultValue
  Object.defineProperty(dlNode, key, {
    get() {
      return this[implicitKey]
    },
    set(value: any) {
      if (this[implicitKey] === value) return
      this[implicitKey] = value
      this[depKey].forEach((dep: any) => dep())
    }
  })
  ;(dlNode as AnyDLNode)[depKey] = new Set()
}

export function addDLProp(
  dlNode: CustomNode,
  tag: "env" | "prop",
  key: string,
  propValueOrFunc: any | (() => any),
  dlScope?: CustomNode,
  dependencies?: string[]
) {
  // ---- Forward all props
  if ((dlNode as AnyDLNode)._$forwardProps && tag === "prop") {
    forwardDLProp(dlNode, key, propValueOrFunc, dlScope, dependencies)
    return
  }

  // ---- No valid Prop or Env Receiver
  if ((dlNode as AnyDLNode)[`$$${key}`] !== tag) return

  // ---- No dependencies, just add the prop
  if (!dependencies || !dlScope) {
    (dlNode as AnyDLNode)[key] = propValueOrFunc
    return
  }

  // ---- Add prop and listeners
  (dlNode as AnyDLNode)[key] = propValueOrFunc()
  dlScope._$addDeps(dependencies, assignFuncDep.bind(dlNode, key, propValueOrFunc))
}

export function forwardDLProp(
  dlNode: CustomNode,
  key: string,
  propOrFunc: any | (() => any),
  dlScope?: CustomNode,
  dependencies?: string[]
) {
  (dlNode as any)[`$$${key}`] = "prop"
  const hasDeps = dependencies && dlScope
  addToDep(dlNode, key, hasDeps ? propOrFunc() : propOrFunc)
  if (!hasDeps) return
  ;(dlNode as AnyDLNode)[key] = propOrFunc()
  dlScope._$addDeps(dependencies, assignFuncDep.bind(dlNode, key, propOrFunc))
}

function assignFuncDep(key: string, propFunc: () => any) {
  this[key] = propFunc()
}
