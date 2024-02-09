import { DLNode } from "./DLNode"
import { DLStore, cached } from "./store"

function cache(el, key, deps) {
  // ---- If there are no deps, update it every time
  if (!deps || !deps.length) return false
  const cacheKey = `$${key}`
  if (cached(deps, el[cacheKey])) return true
  el[cacheKey] = deps
  return false
}

/**
 * @brief Plainly set style
 * @param el
 * @param value
 */
export function setStyle(el, valueFunc, deps) {
  if (cache(el, "style", deps)) return
  const style = valueFunc()
  Object.entries(style).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value)
    } else {
      el.style[key] = value
    }
  })
}

/**
 * @brief Plainly set dataset
 * @param el
 * @param value
 */
export function setDataset(el, valueFunc, deps) {
  if (cache(el, "dataset", deps)) return
  Object.assign(el.dataset, valueFunc())
}

/**
 * @brief Set HTML property with checking value equality first
 * @param el
 * @param key
 * @param value
 */
export function setHTMLProp(el, key, valueFunc, deps) {
  if (cache(el, key, deps)) return
  el[key] = valueFunc()
}

/**
 * @brief Plainly set HTML properties
 * @param el
 * @param value
 */
export function setHTMLProps(el, valueFunc, deps) {
  if (cache(el, "$props", deps)) return
  Object.entries(valueFunc()).forEach(([key, value]) => {
    if (key === "style") return setStyle(el, value)
    if (key === "dataset") return setDataset(el, value)
    setHTMLProp(el, key, value)
  })
}

/**
 * @brief Set HTML attribute with checking value equality first
 * @param el
 * @param key
 * @param value
 */
export function setHTMLAttr(el, key, valueFunc, deps) {
  if (cache(el, key, deps)) return
  el.setAttribute(key, valueFunc())
}

/**
 * @brief Plainly set HTML attributes
 * @param el
 * @param value
 */
export function setHTMLAttrs(el, valueFunc, deps) {
  if (cache(el, "$attrs", deps)) return
  Object.entries(valueFunc()).forEach(([key, value]) => {
    setHTMLAttr(el, key, value)
  })
}

/**
 * @brief Set memorized event, store the previous event in el[`$on${key}`], if it exists, remove it first
 * @param el
 * @param key
 * @param value
 */
export function setEvent(el, key, valueFunc, deps) {
  if (cache(el, key, deps)) return
  const value = valueFunc()
  const prevEvent = el[`$on${key}`]
  if (prevEvent) el.removeEventListener(key, prevEvent)
  el.addEventListener(key, value)
  el[`$on${key}`] = value
}

function eventHandler(e) {
  const key = `$$${e.type}`
  for (const node of e.composedPath()) {
    if (node[key]) node[key](e)
    if (e.cancelBubble) return
  }
}

export function delegateEvent(el, key, valueFunc, deps) {
  if (cache(el, key, deps)) return
  const value = valueFunc()
  if (el[`$$${key}`] === value) return
  el[`$$${key}`] = value
  if (!DLStore.delegatedEvents.has(key)) {
    DLStore.delegatedEvents.add(key)
    DLStore.document.addEventListener(key, eventHandler)
  }
}
/**
 * @brief Shortcut for document.createElement
 * @param tag
 * @returns HTMLElement
 */
export function createElement(tag) {
  return DLStore.document.createElement(tag)
}

/**
 * @brief Insert any DLNode into an element, set the _$nodes and append the element to the element's children
 * @param el
 * @param node
 * @param position
 */
export function insertNode(el, node, position) {
  // ---- Set _$nodes
  if (!el._$nodes) el._$nodes = Array.from(el.childNodes)
  el._$nodes.splice(position, 0, node)

  // ---- Insert nodes' elements
  const flowIdx = DLNode.getFlowIndexFromNodes(el._$nodes, node)
  DLNode.appendNodesWithIndex([node], el, flowIdx)
  // ---- Set parentEl
  DLNode.addParentEl([node], el)
}

/**
 * @brief An inclusive assign prop function that accepts any type of prop
 * @param el
 * @param key
 * @param value
 */
export function forwardHTMLProp(el, key, value, deps) {
  if (key === "style") return setStyle(el, value, deps)
  if (key === "dataset") return setDataset(el, value, deps)
  if (key === "element") return
  if (key === "prop") return setHTMLProps(el, value, deps)
  if (key === "attr") return setHTMLAttrs(el, value, deps)
  if (key === "innerHTML") return setHTMLProp(el, "innerHTML", value, deps)
  if (key === "textContent") return setHTMLProp(el, "textContent", value, deps)
  if (key === "forwardProp") return
  if (key.startsWith("on")) {
    return setEvent(el, key.slice(2).toLowerCase(), value, deps)
  }
  setHTMLAttr(el, key, value, deps)
}
