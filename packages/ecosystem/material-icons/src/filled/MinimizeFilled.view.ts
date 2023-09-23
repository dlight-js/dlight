import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MinimizeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19h12v2H6z\"/>")
      .name("MinimizeFilled")
  }
}

export default MinimizeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
