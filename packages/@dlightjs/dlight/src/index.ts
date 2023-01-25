import { HtmlNode } from "./Nodes"
import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

export const View = CustomNode
export const required = undefined as any

export function render(id: string, dl: CustomNode) {
    const appNode = new HtmlNode("div")
    appNode._$addNodes([dl])
    appNode._$addProp("id", id)
    appNode._$init()
    document.getElementById(id)!.replaceWith(appNode._$el)
}