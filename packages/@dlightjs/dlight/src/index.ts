import { HtmlNode } from "./Nodes"
import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

const View = CustomNode
const required = undefined as any

function render(idOrEl: string | HTMLElement, dl: CustomNode) {
    const appNode = new HtmlNode("div")
    appNode._$addNodes([dl])
    appNode._$addProp("id", typeof idOrEl === "string" ? idOrEl : idOrEl.id)
    appNode._$init()
    appNode._$pre()
    if (typeof idOrEl === "string") {
        idOrEl = document.getElementById(idOrEl)!
    }
    idOrEl.replaceWith(appNode._$el)
    appNode._$after()
}

export {View, required, render}

// ---- 为了不报错，好看一点
export const For = null as any
export const If = null as any
export const ElseIf = null as any
export const Else = null as any
export const Env = null as any
export const Exp = null as any
export const State = null as any
export const Prop = null as any
export const PropState = null as any
export const EnvState = null as any
