/**
 * @brief Shorten document.createTextNode
 * @param value
 * @returns Text
 */
export function createTextNode(value) {
  return document.createTextNode(value)
}

/**
 * @brief Update text node and check if the value is changed
 * @param node
 * @param value
 */
export function updateText(node, value) {
  if (node.textContent === value) return
  node.textContent = value
}
