import { type ExpNode } from "@dlightjs/dlight"

interface ExpressionTag {
  do: (node: ExpNode) => void
  element: HTMLElement[] | ((holder: HTMLElement[]) => void) | undefined
}

type ExpressionTagFunc = (nodes: any) => ExpressionTag

export const _: ExpressionTagFunc = null as any
