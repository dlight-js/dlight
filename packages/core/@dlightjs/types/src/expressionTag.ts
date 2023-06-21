import { type DLNode } from "@dlightjs/dlight"
import { type DLightHTMLAttributesFunc } from "./htmlTag"

interface ExpressionTagHook {
  onUpdateNodes: (prevNodes: DLNode[], nodes: DLNode[]) => void
}

type ExpressionTagFunc = (nodes: string | number | DLNode | DLNode[]) => DLightHTMLAttributesFunc<HTMLElement, ExpressionTagHook>

export const _: ExpressionTagFunc = null as any
