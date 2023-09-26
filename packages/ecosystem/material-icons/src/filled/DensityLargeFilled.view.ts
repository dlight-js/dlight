import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DensityLargeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3zm0 16h18v2H3z\"/>")
      .name("DensityLargeFilled")
  }
}

export default DensityLargeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
