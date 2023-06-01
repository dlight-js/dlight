import { View } from "@dlightjs/dlight"
import { css } from "@dlightjs/emotion"
import { type Typed, _, div, Prop } from "@dlightjs/types"
import { type VAlignment } from "./types"
import { isChildSpacer } from "./Spacer.view"

export class HStack extends View {
  @Prop spacing = 10
  @Prop alignment: VAlignment = "top"
  @Prop width = "100%"
  @Prop height = "max-content"
  margin = (function() {
    switch (this.alignment) {
      case "top":
        return "0 0 auto 0"
      case "bottom":
        return "auto 0 0 0"
      case "center":
        return "auto 0"
      default:
        return ""
    }
  }.call(this))

  Body() {
    div()
      .className(css`
            height: ${this.height};
            width: ${this.width};
            column-gap: ${this.spacing}px;
            display: flex;
            flex-direction: row;
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

export default HStack as any as Typed<HStack>