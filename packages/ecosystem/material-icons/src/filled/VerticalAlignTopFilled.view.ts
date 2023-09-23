import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalAlignTopFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z\"/>")
      .name("VerticalAlignTopFilled")
  }
}

export default VerticalAlignTopFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
