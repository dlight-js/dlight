import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StopFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h12v12H6z\"/>")
      .name("StopFilled")
  }
}

export default StopFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
