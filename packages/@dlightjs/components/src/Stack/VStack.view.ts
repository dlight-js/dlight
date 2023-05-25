import { View } from "@dlightjs/dlight"
import { type HAlignment } from "./types"
import { isChildSpacer } from "./Spacer.view"
import Types, { _, div, Prop } from "@dlightjs/types"
import { css } from "@emotion/css"

interface VStackProps {
  spacing?: number
  alignment?: HAlignment
  width?: string
  height?: string
}

class VStack extends View implements VStackProps {
  @Prop spacing = 10
  @Prop alignment: HAlignment = "leading"
  @Prop width = "max-content"
  @Prop height = "100%"
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

export default Types<VStackProps>(VStack)
