import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowRightFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m10 17 5-5-5-5v10z\"/>")
      .name("ArrowRightFilled")
  }
}

export default ArrowRightFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
