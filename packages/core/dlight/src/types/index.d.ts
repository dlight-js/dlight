import { type Typed } from "./compTag"
import { type DLightHtmlTagFunc } from "./htmlTag"

export const comp: <T>(tag: T) => object extends T ? any : Typed<T>
export const tag: (tag: any) => DLightHtmlTagFunc

export { _ } from "./expressionTag"
export * from "./htmlTag"
export * from "./compTag"
export * from "./envTag"
export * from "./model"
export const Static: any
export const Children: any
export const Content: any
export const Prop: any
export const Env: any
export const Watch: any
export const ForwardProps: any
export const Main: any
export const App: any
export const Mount: (idOrEl: string | HTMLElement) => any

// ---- With actual value
export function render(idOrEl: string | HTMLElement, DL: any): void
export function manual<T>(callback: () => T, _deps?: any[]): T
export function escape<T>(arg: T): T
export function setGlobal(globalObj: any): void
export function setDocument(customDocument: any): void
export const $: typeof escape
export const View: any
export const Model: any
export const update: any
export const required: any
