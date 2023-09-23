import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropDownFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 10 5 5 5-5z\"/>")
      .name("ArrowDropDownFilled")
  }
}

export default ArrowDropDownFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
