// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type HAlignment, type VAlignment } from "./types"
import { type Typed, div, Prop, _ } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class ZStack extends View {
  @Prop hAlignment: Prop<HAlignment> = "center" as any
  @Prop vAlignment: Prop<VAlignment> = "center" as any
  @Prop width: Prop<string> = "max-content" as any
  @Prop height: Prop<string> = "max-content" as any

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

export default ZStack as any as Typed<ZStack>
