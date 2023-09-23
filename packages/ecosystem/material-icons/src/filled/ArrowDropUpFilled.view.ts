import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropUpFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 14 5-5 5 5z\"/>")
      .name("ArrowDropUpFilled")
  }
}

export default ArrowDropUpFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
