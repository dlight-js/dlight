export function createTextNode(value: string) {
  return document.createTextNode(value)
}

export function updateText(node: Text, value: string) {
  if (node.textContent === value) return
  node.textContent = value
}
