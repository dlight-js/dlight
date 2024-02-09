import { Store } from "@dlightjs/store"

// ---- Using external Store to store global and document
//      Because Store is a singleton, it is safe to use it as a global variable
//      If created in DLight package, different package versions will introduce
//      multiple Store instances.

if (!("global" in Store)) {
  if (typeof window !== "undefined") {
    Store.global = window
  } else if (typeof global !== "undefined") {
    Store.global = global
  } else {
    Store.global = {}
  }
}
if (!("document" in Store)) {
  if (typeof document !== "undefined") {
    Store.document = document
  }
}

export const DLStore = { ...Store, delegatedEvents: new Set() }

export function setGlobal(globalObj) {
  DLStore.global = globalObj
}

export function setDocument(customDocument) {
  DLStore.document = customDocument
}

/**
 * @brief Compare the deps with the previous deps
 * @param deps
 * @param prevDeps
 * @returns
 */
export function cached(deps, prevDeps) {
  if (!deps || !prevDeps || deps.length !== prevDeps.length) return false
  return !deps.some((dep, i) => dep instanceof Object || prevDeps[i] !== dep)
}
