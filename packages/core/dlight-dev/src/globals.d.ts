interface Window {
  entryNode: any
  elementMap: Record<string, Node[]>
  elementIdMap: Map<Node, string>
  sendCurrentProps: () => void
  updateNodes: () => void
}
