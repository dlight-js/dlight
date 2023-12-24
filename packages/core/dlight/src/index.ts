import { type AnyDLNode } from "./DLNode"
import { insertNode } from "./HTMLNode"

export * from "./HTMLNode"
export * from "./CompNode"
export * from "./MutableNode/ForNode"
export * from "./MutableNode/IfNode"
export * from "./MutableNode/ExpNode"
export * from "./EnvNode"
export * from "./TextNode"
export * from "./PropView"

export function render(idOrEl: string | HTMLElement, DL: AnyDLNode) {
  let el: HTMLElement = idOrEl as HTMLElement
  if (typeof idOrEl === "string") {
    const elFound = document.getElementById(idOrEl)
    if (elFound) el = elFound
    else {
      throw new Error(`DLight: Element with id ${idOrEl} not found`)
    }
  }
  el.innerHTML = ""
  const dlNode = new DL()
  insertNode(el, dlNode, 0)
}

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape
