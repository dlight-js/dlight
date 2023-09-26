import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowBackIosNewSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z\"/>")
      .name("ArrowBackIosNewSharp")
  }
}

export default ArrowBackIosNewSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
