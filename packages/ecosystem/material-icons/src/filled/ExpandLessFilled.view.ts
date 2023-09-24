import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ExpandLessFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z\"/>")
      .name("ExpandLessFilled")
  }
}

export default ExpandLessFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
