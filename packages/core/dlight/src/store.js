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

/***
 * @brief Compare two values with rule:
 *   1. Primitive/Function: Compared directly
 *   2. Array: Compared by each element
 *   3. Object: Compared items with depth at most 2
 * @param a
 * @param b
 * @param objCompareDepth
 */
function compare(a, b, objCompareDepth = 0) {
  if (objCompareDepth > 2) return false
  if (a instanceof Array) {
    if (!(b instanceof Array)) return false
    if (a.length !== b.length) return false
    return !a.some((c, i) => !compare(c, b[i]))
  }

  if (a instanceof Object) {
    if (!(b instanceof Object)) return false
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (let key of keysA) {
      if (!compare(a[key], b[key], objCompareDepth + 1)) return false
    }
    return true
  }

  return a === b
}

/**
 * @brief Compare the deps with the previous deps
 * @param deps
 * @param prevDeps
 * @returns
 */
export function cached(deps, prevDeps) {
  if (!prevDeps || deps.length !== prevDeps.length) return false
  return !deps.some((dep, i) => !compare(dep, prevDeps[i]))
}
