import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MarkunreadMailboxRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6H10v5c0 .55-.45 1-1 1s-1-.45-1-1V4h5c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z\"/>")
      .name("MarkunreadMailboxRound")
  }
}

export default MarkunreadMailboxRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
