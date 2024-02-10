import { DLStore, cached } from "./store"

/**
 * @brief Shorten document.createTextNode
 * @param value
 * @returns Text
 */
export function createTextNode(value, deps) {
  const node = DLStore.document.createTextNode(value)
  node.$$deps = deps
  return node
}

/**
 * @brief Update text node and check if the value is changed
 * @param node
 * @param value
 */
export function updateText(node, valueFunc, deps) {
  if (cached(deps, node.$$deps)) return
  const value = valueFunc()
  node.textContent = value
  node.$$deps = deps
}
