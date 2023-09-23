import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MaximizeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3z\"/>")
      .name("MaximizeFilled")
  }
}

export default MaximizeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
