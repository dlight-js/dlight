import { CustomNode } from "./Nodes"

export * from "./Nodes"
export * from "./utils/nodes"

const View = CustomNode
const required = undefined as any


function render(idOrEl: string | HTMLElement, dl: { new (): CustomNode }) {
    new dl().render(idOrEl)
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
