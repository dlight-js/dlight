import { insertNode } from "./HTMLNode"

export * from "./HTMLNode"
export * from "./CustomNode"
export * from "./ForNode"
export * from "./IfNode"

export function render(
  idOrEl: string | HTMLElement,
  DL: any
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
  const dlNode = new DL()
  insertNode(el, dlNode, 0)
}
