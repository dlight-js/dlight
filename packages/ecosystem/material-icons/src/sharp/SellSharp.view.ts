import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SellSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22.83 12.83 12 2H2v10l10.83 10.83 10-10zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z\"/>")
      .name("SellSharp")
  }
}

export default SellSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
