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


function getElChild(baseEl: HTMLElement, idx: number): HTMLElement {
  if (idx === 0) return baseEl.firstChild! as HTMLElement
  if (idx === 1) return baseEl.firstChild!.nextSibling  as HTMLElement
  if (idx === 2) return baseEl.firstChild!.nextSibling!.nextSibling  as HTMLElement
  return baseEl.childNodes[idx]  as HTMLElement
}

export function getEl(baseEl: HTMLElement, ...path: number[]) {
  return path.reduce<HTMLElement>((el, idx) => getElChild(el, idx), baseEl)
}


export function setProp(el: HTMLElement, key: string, value: any) {
  if (el.$storePrev?.[key] === value) return
  el[key] = value
  if (!el.$storePrev) el.$storePrev = {}
  el.$storePrev[key] = value
}

export function setEvent(el: HTMLElement, key: string, value: any) {
  if (el.$storePrev?.[key] === value) return
  el.addEventListener(key, value)
  if (el.$storePrev?.[key]) el.removeEventListener(key, el.$storePrev[key])
  if (!el.$storePrev) el.$storePrev = {}
  el.$storePrev[key] = value
}

export function setDLProp(dl: AnyDLNode, key: string, value: any) {
  if (dl[`$$${key}`] !== "prop") return
  dl[`$${key}`] = value
}


export function changeDLProp(dl: AnyDLNode, key: string, value: any) {
  if (dl[`$$${key}`] !== "prop") return
  if (dl[key] === value) return
  dl[key] = value
}

export function insertNode(el: HTMLElement, node: AnyDLNode, position: number) {
  if (!el._$nodes) el._$nodes = Array.from(el.childNodes)
  console.log("inin", node)
  el._$nodes.splice(position, 0, node)
  node._$parentEl = el
}

export function setDLContent(dl: AnyDLNode, key: string, value: any) {
  
}

export function changeDLContent(dl: AnyDLNode, key: string, value: any) {
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
