import { HtmlNode } from "./Nodes"
import { CustomNode } from "./Nodes/CustomNode"

export * from "./Nodes"
export * from "./utils/nodes"

export const View = CustomNode


export function render(selectName: string, dl: CustomNode) {
    const appNode = new HtmlNode("div")
    appNode._$addNodes([dl])
    appNode._$addProp("id", selectName)
    appNode._$init()
    document.querySelector(selectName)!.replaceWith(appNode._$el)
}