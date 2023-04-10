import { DLNode } from "@dlightjs/dlight";
import { DLightHtmlTag } from "./htmlTag";

interface ExpressionTag extends DLightHtmlTag<ExpressionTag> {
    onUpdateNodes: (func: (prevNodes: DLNode[], nodes: DLNode[]) => void) => ExpressionTag
}

export const _: (expression: string | number | DLNode | DLNode[]) => ExpressionTag = null as any
