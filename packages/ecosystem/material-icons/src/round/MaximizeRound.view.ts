import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MaximizeRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 3h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z\"/>")
      .name("MaximizeRound")
  }
}

export default MaximizeRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
