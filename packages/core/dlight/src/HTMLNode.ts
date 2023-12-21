import { DLNode } from "./DLNode"
import { type AnyDLNode } from "./types"

export function setStyle(el: HTMLElement, value: CSSStyleDeclaration) {
  Object.entries(value).forEach(([key, value]) => {
    el.style[key as any] = value
  })
}

export function setDataset(el: HTMLElement, value: Record<string, string>) {
  Object.entries(value).forEach(([key, value]) => {
    el.dataset[key] = value
  })
}

export function setHTMLProp(el: HTMLElement, key: keyof HTMLElement, value: any) {
  if ((el as AnyDLNode)[key] === value) return
  (el as AnyDLNode)[key] = value
}

export function setHTMLProps(el: HTMLElement, value: Record<string, any>) {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLProp(el, key as any, value)
  })
}

export function setHTMLAttr(el: HTMLElement, key: string, value: any) {
  if (el.getAttribute(key) === value) return
  el.setAttribute(key, value)
}

export function setHTMLAttrs(el: HTMLElement, value: Record<string, any>) {
  Object.entries(value).forEach(([key, value]) => {
    setHTMLAttr(el, key, value)
  })
}

export function setMemorizedEvent(el: HTMLElement, key: string, value: any) {
  const prevEvent = (el as any)[`$on${key}`]
  if (prevEvent) el.removeEventListener(key, prevEvent)
  el.addEventListener(key, value)
  ;(el as any)[`$on${key}`] = value
}

export function createTemplate(templateStr: string) {
  const template = document.createElement("template")
  template.innerHTML = templateStr

  const element = template.content.firstChild
  return () => element!.cloneNode(true) as HTMLElement
}

export function createElement(tag: string) {
  return document.createElement(tag)
}

export function insertNode(el: HTMLElement, node: any, position: number) {
  // ---- Set _$nodes
  if (!(el as AnyDLNode)._$nodes) (el as AnyDLNode)._$nodes = Array.from(el.childNodes)
  ;(el as AnyDLNode)._$nodes.splice(position, 0, node)

  // ---- Set parentEl
  node._$parentEl = el
  DLNode.addParentEl(node._$nodes, el)

  // ---- Insert nodes' elements
  DLNode.appendNodesWithIndex(node._$nodes, el, position)
}
