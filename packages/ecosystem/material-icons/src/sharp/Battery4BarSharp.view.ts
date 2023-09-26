import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Battery4BarSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4v18H7V4h3V2h4v2h3zm-2 2H9v6h6V6z\"/>")
      .name("Battery4BarSharp")
  }
}

export default Battery4BarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
