import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MaximizeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3V3z\"/>")
      .name("MaximizeSharp")
  }
}

export default MaximizeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
