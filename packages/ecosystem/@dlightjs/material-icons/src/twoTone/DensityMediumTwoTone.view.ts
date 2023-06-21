import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DensityMediumTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3z\"/>")
      .name("DensityMediumTwoTone")
  }
}

export default DensityMediumTwoTone as any as Typed<DLightIconType>
