import { appendNodesWithIndex } from "./flowIndex"

function getChildElementByIdx(baseEl: HTMLElement, idx: number): HTMLElement {
  if (idx === 0) return baseEl.firstChild! as HTMLElement
  if (idx === 1) return baseEl.firstChild!.nextSibling as HTMLElement
  if (idx === 2) return baseEl.firstChild!.nextSibling!.nextSibling as HTMLElement
  return baseEl.childNodes[idx] as HTMLElement
}

export function getChildElementByPath(baseEl: HTMLElement, ...path: number[]) {
  return path.reduce<HTMLElement>((el, idx) => getChildElementByIdx(el, idx), baseEl)
}

export function setStyle(el: HTMLElement, value: CSSStyleDeclaration) {
  Object.entries(value).forEach(([key, value]) => {
    el.style[key as any] = value
  })
}

export function setMemorizedProp(el: HTMLElement, key: keyof HTMLElement, value: any) {
  if ((el as any)[key] === value) return
  (el as any)[key] = value
}

export function setMemorizedAttr(el: HTMLElement, key: string, value: any) {
  if (el.getAttribute(key) === value) return
  el.setAttribute(key, value)
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
  if (!(el as any)._$nodes) (el as any)._$nodes = Array.from(el.childNodes)

  ;(el as any)._$nodes.splice(position, 0, node)
  node._$parentEl = el
  node._$init?.()
  appendNodesWithIndex([node], el, position)
}
