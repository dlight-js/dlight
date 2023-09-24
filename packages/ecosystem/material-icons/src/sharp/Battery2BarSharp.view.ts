import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Battery2BarSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4v18H7V4h3V2h4v2h3zm-2 2H9v10h6V6z\"/>")
      .name("Battery2BarSharp")
  }
}

export default Battery2BarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
