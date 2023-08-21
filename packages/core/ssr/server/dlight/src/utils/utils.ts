import { CustomNode } from "../Nodes"
import { document } from "../utils/dom"
import { getScript } from "./script"

export function manual(callback: () => any, _deps?: any[]) {
  return callback()
}
export function escape<T>(arg: T): T {
  return arg
}

export const $ = escape

export const View = CustomNode

export function renderToString(DL: any) {
  const newEl = document.createElement("div")
  new DL().render(newEl)
  const html = newEl.innerHTML

  return { html, script: getScript() }
}
