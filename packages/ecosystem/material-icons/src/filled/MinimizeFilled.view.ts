import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MinimizeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19h12v2H6z\"/>")
      .name("MinimizeFilled")
  }
}

export default MinimizeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
