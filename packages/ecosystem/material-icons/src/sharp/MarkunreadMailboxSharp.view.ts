import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MarkunreadMailboxSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6H10v6H8V4h6V0H6v6H2v16h20V6z\"/>")
      .name("MarkunreadMailboxSharp")
  }
}

export default MarkunreadMailboxSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
