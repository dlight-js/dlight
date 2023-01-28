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
    if (typeof idOrEl === "string") {
        idOrEl = document.getElementById(idOrEl)!
    }
    idOrEl.replaceWith(appNode._$el)
}

export {View, required, render}
