import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowLeftFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14 7-5 5 5 5V7z\"/>")
      .name("ArrowLeftFilled")
  }
}

export default ArrowLeftFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
