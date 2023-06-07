import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

export const View = CustomNode

export function render(idOrEl: string | HTMLElement, DL: any) {
  new DL().render(idOrEl)
}

export * from "./utils"
