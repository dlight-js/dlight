import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BurstModeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 5h2v14H1V5zm4 0h2v14H5V5zm18 0H9v14h14V5zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z\"/>")
      .name("BurstModeSharp")
  }
}

export default BurstModeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
