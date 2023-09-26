import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowDropUpFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 14 5-5 5 5z\"/>")
      .name("ArrowDropUpFilled")
  }
}

export default ArrowDropUpFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
