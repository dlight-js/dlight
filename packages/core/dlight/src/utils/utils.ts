import { insertNode } from "../HTMLNode"
import { CustomNode } from "../Nodes"
import { type AnyDLNode } from "../Nodes/type"

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape

export const View = CustomNode as typeof CustomNode & ((...args: any) => any)

export function template(htmlString: string) {
  const template = document.createElement("template")
  template.innerHTML = htmlString
  return template.content.firstChild
}

export function render(
  idOrEl: string | HTMLElement,
  DL: (typeof View) | Function
) {
  let el: HTMLElement = idOrEl as HTMLElement
  if (typeof idOrEl === "string") {
    const elFound = document.getElementById(idOrEl)
    if (elFound) el = elFound
    else {
      throw new Error(`Element with id ${idOrEl} not found`)
    }
  }
  el.innerHTML = ""
  const dlNode = new (DL as AnyDLNode)()
  insertNode(el, dlNode, 0)
  dlNode._$init()
}

export function renderToString(DL: typeof View | Function) {
  const newEl = document.createElement("div")
  render(newEl, DL)
  return newEl.innerHTML
}

export const tag = null as any
export const htmlTag = null as any
export const Static = null as any
export const Children = null as any
export const Content = null as any
export const Prop = null as any
export const Env = null as any
export const Watch = null as any
export const env = null as any
export const _ = null as any
export const required = null as any
