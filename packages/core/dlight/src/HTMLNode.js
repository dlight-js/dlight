import { DLNode } from "./DLNode"
import { DLStore, cached } from "./store"

function cache(el, key, deps) {
  if (deps.length === 0) return false
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
export function setStyle(el, value) {
  Object.entries(value).forEach(([key, value]) => {
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
export function setDataset(el, value) {
  Object.assign(el.dataset, value)
}

/**
 * @brief Set HTML property with checking value equality first
 * @param el
 * @param key
 * @param value
 */
export function setHTMLProp(el, key, valueFunc, deps) {
  // ---- Comparing deps, same value won't trigger
  //      will lead to a bug if the value is set outside of the DLNode
  //      e.g. setHTMLProp(el, "textContent", "value", [])
  //       =>  el.textContent = "other"
  //       =>  setHTMLProp(el, "textContent", "value", [])
  //       The value will be set to "other" instead of "value"
  if (cache(el, key, deps)) return
  el[key] = valueFunc()
}

/**
 * @brief Plainly set HTML properties
 * @param el
 * @param value
 */
export function setHTMLProps(el, value) {
  Object.entries(value).forEach(([key, v]) => {
    if (key === "style") return setStyle(el, v)
    if (key === "dataset") return setDataset(el, v)
    setHTMLProp(el, key, v, [])
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
export function setHTMLAttrs(el, value) {
  Object.entries(value).forEach(([key, v]) => {
    setHTMLAttr(el, key, v, [])
  })
}

/**
 * @brief Set memorized event, store the previous event in el[`$on${key}`], if it exists, remove it first
 * @param el
 * @param key
 * @param value
 */
export function setEvent(el, key, value) {
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

export function delegateEvent(el, key, value) {
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
