import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MarkunreadMailboxFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z\"/>")
      .name("MarkunreadMailboxFilled")
  }
}

export default MarkunreadMailboxFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
