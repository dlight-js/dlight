import { View } from "@dlightjs/dlight"
import { type HAlignment, type VAlignment } from "./types"
import Types, { div, Prop, _ } from "@dlightjs/types"
import { css } from "@emotion/css"

interface ZStackProps {
  spacing?: number
  hAlignment?: HAlignment
  vAlignment?: VAlignment
  width?: string
  height?: string
}

class ZStack extends View implements ZStackProps {
  @Prop hAlignment: HAlignment = "center"
  @Prop vAlignment: VAlignment = "center"
  @Prop width = "max-content"
  @Prop height = "max-content"

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
      for (const child of this._$children) {
        _(child)
          .className(css`
            position: relative;
            grid-area: 1 / 1/ 1 / 1;
          `)
      }
    }
  }
}

export default Types<ZStackProps>(ZStack)
