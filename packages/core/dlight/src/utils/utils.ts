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

export const tag = null as any
export const htmlTag = null as any
export const Static = null as any
export const Children = null as any
export const Default = null as any
export const Prop = null as any
export const Env = null as any
export const env = null as any
export const _ = null as any
export const required = null as any
