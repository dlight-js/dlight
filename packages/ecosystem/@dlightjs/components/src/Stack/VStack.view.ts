// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { type HAlignment } from "./types"
import { isChildSpacer } from "./Spacer.view"
import { type Typed, _, div, Prop } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class VStack extends View {
  @Prop spacing: Prop<number> = 0 as any
  @Prop alignment: Prop<HAlignment> = "leading" as any
  @Prop width: Prop<string> = "max-content" as any
  @Prop height: Prop<string> = "100%" as any
  margin = (function() {
    switch (this.alignment) {
      case "leading":
        return "0 auto 0 0"
      case "tailing":
        return "0 0 0 auto"
      case "center":
        return "0 auto"
      default:
        return ""
    }
  }.call(this))

  Body() {
    div()
      .className(css`
        height: ${this.height};
        width: ${this.width};
        row-gap: ${this.spacing}px;
        display: flex;
        flex-direction: column;
    `)
    {
      for (const child of this._$children) {
        if (isChildSpacer(child)) {
          _(child)
        } else {
          _(child)
            .className(css`
                flex-shrink: 0;
                margin: ${this.margin};
            `)
        }
      }
    }
  }
}

export default VStack as any as Typed<VStack>