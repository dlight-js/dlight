import { type DLNode, DLNodeType, View } from "@dlightjs/dlight"
import { type Typed, div } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class Spacer extends View {
  isSpacer = true
  Body() {
    div()
      .className(css`
            flex-grow: 1;
        `)
  }
}

export function isChildSpacer(child: DLNode) {
  if (![DLNodeType.HTML, DLNodeType.Text].includes(child._$nodeType)) {
    if ((child as any).isSpacer) {
      return true
    }
    for (const node of child._$nodes ?? []) {
      if (isChildSpacer(node)) {
        return true
      }
    }
  }
  return false
}

export default Spacer as any as Typed<Spacer>
