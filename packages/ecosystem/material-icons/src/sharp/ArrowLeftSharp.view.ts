import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14 7-5 5 5 5V7z\"/>")
      .name("ArrowLeftSharp")
  }
}

export default ArrowLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
