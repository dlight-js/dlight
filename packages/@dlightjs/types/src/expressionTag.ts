import { type DLNode } from "@dlightjs/dlight"
import { type DLightHtmlTag } from "./htmlTag"

// @ts-expect-error no error
interface ExpressionTag extends DLightHtmlTag<ExpressionTag> {
  // @ts-expect-error no error
  onUpdateNodes: (func: (prevNodes: DLNode[], nodes: DLNode[]) => void) => ExpressionTag
}

export const _: (expression: string | number | DLNode | DLNode[]) => ExpressionTag = null as any
