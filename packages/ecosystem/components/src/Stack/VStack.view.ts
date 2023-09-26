import { Children, type DLNode, View, required, Prop } from "@dlightjs/dlight"
import { type HAlignment } from "./types"
import { isChildSpacer } from "./Spacer.view"
import { type Typed, _, div, type Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface VStackProps {
  spacing?: number
  alignment?: HAlignment
  width?: string
  height?: string
}

@View
class VStack implements VStackProps {
  @Prop spacing = 0
  @Prop alignment: HAlignment = "leading"
  @Prop width = "max-content"
  @Prop height = "100%"
  @Children children: DLNode[] = required
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
      for (const child of this.children) {
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

export default VStack as Pretty as Typed<VStackProps>
