import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DensityMediumSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3z\"/>")
      .name("DensityMediumSharp")
  }
}

export default DensityMediumSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
