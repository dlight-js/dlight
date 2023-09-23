import { CustomNode } from "../Nodes"

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape

export const View = CustomNode as typeof CustomNode & ((...args: any) => any)

export function render(idOrEl: string | HTMLElement, DL: (typeof View) | Function) {
  new (DL as any)().render(idOrEl)
}

export function renderToString(DL: typeof View | Function) {
  const newEl = document.createElement("div")
  new (DL as any)().render(newEl)
  return newEl.innerHTML
}
