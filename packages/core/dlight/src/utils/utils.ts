import { CustomNode } from "../Nodes"

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape

export const View = CustomNode

export function render(idOrEl: string | HTMLElement, DL: any) {
  new DL().render(idOrEl)
}

export function renderToText(DL: any) {
  const newEl = document.createElement("div")
  new DL().render(newEl)
  return newEl.innerHTML
}
