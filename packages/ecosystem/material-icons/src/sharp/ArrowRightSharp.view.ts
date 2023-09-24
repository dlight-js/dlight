import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowRightSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m10 17 5-5-5-5v10z\"/>")
      .name("ArrowRightSharp")
  }
}

export default ArrowRightSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
