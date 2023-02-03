import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

const View = CustomNode
const required = undefined as any


function render(idOrEl: string | HTMLElement, dl: { new (): CustomNode }) {
    new dl().render(idOrEl)
}

export {View, required, render}
