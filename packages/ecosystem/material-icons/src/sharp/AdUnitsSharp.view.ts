import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AdUnitsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 1H5v22h14V1zm-2 18H7V5h10v14z\"/><path d=\"M8 6h8v2H8z\"/>")
      .name("AdUnitsSharp")
  }
}

export default AdUnitsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
