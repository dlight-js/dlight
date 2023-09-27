import { type Typed } from "./customTag"
import { type DLightHtmlTagFunc } from "./htmlTag"

export const tag: <T>(tag: T) => Typed<T extends any ? {} : T> = null as any
export const htmlTag: (tag: any) => DLightHtmlTagFunc = null as any

export { _ } from "./expressionTag"
export * from "./htmlTag"
export * from "./customTag"
