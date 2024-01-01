import { DLNode } from "./DLNode"

/**
 * @brief Plainly set style
 * @param el - The HTML element to apply styles to
 * @param value - The CSS style declarations to set
 */
export function setStyle(el, value) {
  Object.assign(el.style, value)
}

/**
 * @brief Plainly set dataset
 * @param el - The HTML element to set the dataset on
 * @param value - The dataset values to set
 */
export function setDataset(el, value) {
  Object.assign(el.dataset, value)
}

/**
 * @brief Set HTML property with checking value equality first
 * @param el - The HTML element to set the property on
 * @param key - The property key
 * @param value - The value to set for the property
 */
export function setHTMLProp(el, key, value) {
  const prevKey = `$${key}`
  if (prevKey in el && el[prevKey] === value) return
  el[key] = value
  el[prevKey] = value
}

/**
 * @brief Plainly set HTML properties
 * @param el - The HTML element to set properties on
 * @param value - The properties to set
 */
export function setHTMLProps(el, value) {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLProp(el, key, value)
  })
}

/**
 * @brief Set HTML attribute with checking value equality first
 * @param el - The HTML element to set the attribute on
 * @param key - The attribute key
 * @param value - The value to set for the attribute
 */
export function setHTMLAttr(el, key, value) {
  const prevKey = `$${key}`
  if (prevKey in el && el[prevKey] === value) return
  el.setAttribute(key, value)
  el[prevKey] = value
}

/**
 * @brief Plainly set HTML attributes
 * @param el - The HTML element to set attributes on
 * @param value - The attributes to set
 */
export function setHTMLAttrs(el, value) {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLAttr(el, key, value)
  })
}

/**
 * @brief Set memorized event, store the previous event in el[`$on${key}`], if it exists, remove it first
 * @param el - The HTML element to attach the event to
 * @param key - The event type
 * @param value - The event listener function
 */
export function setEvent(el, key, value) {
  const prevEvent = el[`$on${key}`]
  if (prevEvent) el.removeEventListener(key, prevEvent)
  el.addEventListener(key, value)
  el[`$on${key}`] = value
}

/**
 * @brief Create a template function, which returns a function that returns a cloned element
 * @param templateStr - The HTML string to use as a template
 * @returns A function that when called, returns a cloned element from the template
 */
export function createTemplate(templateStr) {
  const template = document.createElement("template")
  template.innerHTML = templateStr

  const element = template.content.firstChild
  return () => element.cloneNode(true)
}

/**
 * @brief Shortcut for document.createElement
 * @param tag - The tag name of the element to create
 * @returns The created HTMLElement
 */
export function createElement(tag) {
  return document.createElement(tag)
}

/**
 * @brief Insert any DLNode into an element, set the _$nodes and append the element to the element's children
 * @param el - The parent HTML element
 * @param node - The DLNode to insert
 * @param position - The position at which to insert the node
 */
export function insertNode(el, node, position) {
  if (!el._$nodes) el._$nodes = Array.from(el.childNodes)
  el._$nodes.splice(position, 0, node)

  const flowIdx = DLNode.getFlowIndexFromNodes(el._$nodes, node)
  DLNode.appendNodesWithIndex([node], el, flowIdx)
  DLNode.addParentEl([node], el)
}

/**
 * @brief An inclusive assign prop function that accepts any type of prop
 * @param el - The HTML element to assign the property to
 * @param key - The property key
 * @param value - The value to assign
 */
export function forwardHTMLProp(el, key, value) {
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
