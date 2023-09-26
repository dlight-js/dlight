import { Children, type DLNode, Prop, View, required } from "@dlightjs/dlight"
import { type HAlignment, type VAlignment } from "./types"
import { type Typed, div, _, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface ZStackProps {
  hAlignment?: HAlignment
  vAlignment?: VAlignment
  width?: string
  height?: string
}

@View
class ZStack implements ZStackProps {
  @Prop hAlignment: HAlignment = "center"
  @Prop vAlignment: VAlignment = "center"
  @Prop width = "max-content"
  @Prop height = "max-content"
  @Children children: DLNode[] = required
  Body() {
    div()
      .className(css`
        height: ${this.height};
        width: ${this.width};
        display: grid;
        align-items: ${({
          top: "flex-start",
          center: "center",
          bottom: "flex-end"
          })[this.vAlignment]};
        justify-items: ${({
          leading: "left",
          center: "center",
          tailing: "right"
          })[this.hAlignment]};
      `)
    {
      for (const child of this.children) {
        _(child)
          .className(css`
            position: relative;
            grid-area: 1 / 1/ 1 / 1;
          `)
      }
    }
  }
}

export default ZStack as Pretty as Typed<ZStack>
