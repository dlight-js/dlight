import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

export const View = CustomNode

export function render(idOrEl: string | HTMLElement, DL: any) {
  new DL().render(idOrEl)
}

export function renderToText(DL: any) {
  const newEl = document.createElement("div")
  new DL().render(newEl)
  return newEl.innerHTML
}

export * from "./utils"
