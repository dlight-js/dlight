/**
 * @brief Shorten document.createTextNode
 * @param value - The string value for the text node
 * @returns Text - The created text node
 */
export function createTextNode(value) {
  return document.createTextNode(value)
}

/**
 * @brief Update text node and check if the value is changed
 * @param node - The text node to update
 * @param value - The new string value for the text node
 */
export function updateText(node, value) {
  if (node.textContent === value) return
  node.textContent = value
}
