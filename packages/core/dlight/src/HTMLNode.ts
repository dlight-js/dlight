import { DLNode, type AnyDLNode } from "./DLNode"

/**
 * @brief Plainly set style
 * @param el
 * @param value
 */
export function setStyle(el: HTMLElement, value: CSSStyleDeclaration): void {
  Object.entries(value).forEach(([key, value]) => {
    el.style[key as any] = value
  })
}

/**
 * @brief Plainly set dataset
 * @param el
 * @param value
 */
export function setDataset(
  el: HTMLElement,
  value: Record<string, string>
): void {
  Object.entries(value).forEach(([key, value]) => {
    el.dataset[key] = value
  })
}

/**
 * @brief Set HTML property with checking value equality first
 * @param el
 * @param key
 * @param value
 */
export function setHTMLProp(
  el: HTMLElement,
  key: keyof HTMLElement,
  value: any
): void {
  const prevKey = `$${key}`
  if (prevKey in el && (el as AnyDLNode)[prevKey] === value) return
  ;(el as AnyDLNode)[key] = value
  ;(el as AnyDLNode)[prevKey] = value
}

/**
 * @brief Plainly set HTML properties
 * @param el
 * @param value
 */
export function setHTMLProps(
  el: HTMLElement,
  value: Record<string, any>
): void {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLProp(el, key as any, value)
  })
}

/**
 * @brief Set HTML attribute with checking value equality first
 * @param el
 * @param key
 * @param value
 */
export function setHTMLAttr(el: HTMLElement, key: string, value: any): void {
  const prevKey = `$${key}`
  if (prevKey in el && (el as AnyDLNode)[prevKey] === value) return
  el.setAttribute(key, value)
  ;(el as AnyDLNode)[prevKey] = value
}

/**
 * @brief Plainly set HTML attributes
 * @param el
 * @param value
 */
export function setHTMLAttrs(
  el: HTMLElement,
  value: Record<string, any>
): void {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLAttr(el, key, value)
  })
}

/**
 * @brief Set memorized event, store the previous event in el[`$on${key}`], if it exists, remove it first
 * @param el
 * @param key
 * @param value
 */
export function setEvent(el: HTMLElement, key: string, value: any): void {
  const prevEvent = (el as any)[`$on${key}`]
  if (prevEvent) el.removeEventListener(key, prevEvent)
  el.addEventListener(key, value)
  ;(el as any)[`$on${key}`] = value
}

/**
 * @brief Create a template function, which returns a function that returns a cloned element
 * @param templateStr
 * @returns a function that returns a cloned element
 */
export function createTemplate(templateStr: string): () => HTMLElement {
  const template = document.createElement("template")
  template.innerHTML = templateStr

  const element = template.content.firstChild
  return () => element!.cloneNode(true) as HTMLElement
}

/**
 * @brief Shortcut for document.createElement
 * @param tag
 * @returns HTMLElement
 */
export function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

/**
 * @brief Insert any DLNode into an element, set the _$nodes and append the element to the element's children
 * @param el
 * @param node
 * @param position
 */
export function insertNode(
  el: HTMLElement,
  node: AnyDLNode,
  position: number
): void {
  // ---- Set _$nodes
  if (!(el as AnyDLNode)._$nodes)
    (el as AnyDLNode)._$nodes = Array.from(el.childNodes)
  ;(el as AnyDLNode)._$nodes.splice(position, 0, node)

  // ---- Set parentEl
  node._$parentEl = el
  DLNode.addParentEl(node._$nodes, el)

  // ---- Insert nodes' elements
  DLNode.appendNodesWithIndex(node._$nodes, el, position)
}

/**
 * @brief An inclusive assign prop function that accepts any type of prop
 * @param el
 * @param key
 * @param value
 */
export function forwardHTMLProp(
  el: HTMLElement,
  key: string,
  value: any
): void {
  if (key === "style") {
    setStyle(el, value)
    return
  }
  if (key === "dataset") {
    setDataset(el, value)
    return
  }
  if (key === "element") return
  if (key === "prop") {
    setHTMLProps(el, value)
    return
  }
  if (key === "attr") {
    setHTMLAttrs(el, value)
    return
  }
  if (key === "innerHTML") {
    setHTMLProp(el, "innerHTML", value)
    return
  }
  if (key === "forwardProp") return
  if (key.startsWith("on")) {
    setEvent(el, key.slice(2).toLowerCase(), value)
    return
  }
  setHTMLAttr(el, key, value)
}
