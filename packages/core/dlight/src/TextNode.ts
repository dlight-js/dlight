/**
 * @brief Shorten document.createTextNode
 * @param value
 * @returns Text
 */
export function createTextNode(value: string): Text {
  return document.createTextNode(value)
}

/**
 * @brief Update text node and check if the value is changed
 * @param node
 * @param value
 */
export function updateText(node: Text, value: string): void {
  if (node.textContent === value) return
  node.textContent = value
}
