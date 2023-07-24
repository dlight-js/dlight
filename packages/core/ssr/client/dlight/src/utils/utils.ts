import { CustomNode } from "../Nodes"

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape

export const View = CustomNode

export function render(idOrEl: string | HTMLElement, DL: typeof View) {
  new DL().render(idOrEl)
}

export function renderToString(DL: typeof View) {
  const newEl = document.createElement("div")
  new DL().render(newEl)
  return newEl.innerHTML
}
