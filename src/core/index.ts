import { HtmlNode } from "./Nodes"
import { DLightNode } from "./Nodes/DlightNode"

export * from "./Nodes"
export * from "./utils/nodes"

export const View = DLightNode


export function render(selectName: string, dl: DLightNode) {
    const appNode = new HtmlNode("div")
    appNode._$addNode(dl)
    appNode._$addProp("id", selectName)
    appNode._$init()
    document.querySelector(selectName)!.replaceWith(appNode._$el)
}