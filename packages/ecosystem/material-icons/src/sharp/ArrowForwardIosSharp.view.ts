import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowForwardIosSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z\"/>")
      .name("ArrowForwardIosSharp")
  }
}

export default ArrowForwardIosSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
