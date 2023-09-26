import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SpaceBarRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10v3H6v-3c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1z\"/>")
      .name("SpaceBarRound")
  }
}

export default SpaceBarRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
