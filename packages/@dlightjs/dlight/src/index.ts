import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

const View = CustomNode as any

function render(idOrEl: string | HTMLElement, DL: any) {
  new DL().render(idOrEl)
}

export { View, render }
