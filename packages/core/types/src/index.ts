import { type Typed } from "./customTag"
import { type DLightHtmlTagFunc } from "./htmlTag"

export const comp: <T>(tag: T) => Typed<T extends any ? object : T> =
  null as any
export const tag: (tag: any) => DLightHtmlTagFunc = null as any

export { _ } from "./expressionTag"
export * from "./htmlTag"
export * from "./customTag"
export * from "./envTag"
export const Static = null as any
export const Children = null as any
export const Content = null as any
export const Prop = null as any
export const Env = null as any
export const Watch = null as any
export const ForwardProps = null as any
export const required = null as any
