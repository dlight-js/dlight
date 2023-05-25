import { type DLNode } from "@dlightjs/dlight"
import { type DLightHtmlHook } from "./htmlTag"
import { type DLightHTMLElement } from "./htmlTag/htmlElement"

interface ExpressionTagHook<T> extends DLightHtmlHook<T> {
  onUpdateNodes: (func: (prevNodes: DLNode[], nodes: DLNode[]) => void) => ExpressionTagHook<T>
}

export type ExpressionTag<T, G=DLightHTMLElement<T>> = G & ExpressionTagHook<T>

interface ExpressionTagSpecific extends ExpressionTag<ExpressionTagSpecific> {}
type ExpressionTagFunc = (nodes: string | number | any) => ExpressionTagSpecific

export const _: ExpressionTagFunc = null as any
