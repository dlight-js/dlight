import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DensitySmallFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 2h18v2H3zm0 18h18v2H3zm0-6h18v2H3zm0-6h18v2H3z\"/>")
      .name("DensitySmallFilled")
  }
}

export default DensitySmallFilled as any as Typed<DLightIconType>