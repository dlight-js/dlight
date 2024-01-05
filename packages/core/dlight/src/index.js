import { DLNode } from "./DLNode"
import { insertNode } from "./HTMLNode"

export * from "./HTMLNode"
export * from "./CompNode"
export * from "./EnvNode"
export * from "./TextNode"
export * from "./PropView"
export * from "./SubViewNode"
export * from "./MutableNode/ForNode"
export * from "./MutableNode/ExpNode"
export * from "./MutableNode/CondNode"

import { DLStore } from "./store"
export { setGlobal, setDocument } from "./store"

export function render(idOrEl, DL) {
  let el = idOrEl
  if (typeof idOrEl === "string") {
    const elFound = DLStore.document.getElementById(idOrEl)
    if (elFound) el = elFound
    else {
      throw new Error(`DLight: Element with id ${idOrEl} not found`)
    }
  }
  el.innerHTML = ""
  const dlNode = new DL()
  dlNode._$init()
  insertNode(el, dlNode, 0)
  DLNode.runDidMount(dlNode._$nodes)
}

export function manual(callback, _deps) {
  return callback()
}
export function escape(arg) {
  return arg
}

export const $ = escape
