import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalShadesFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h20v-2h-2zm-10 0V5h4v14h-4z\"/>")
      .name("VerticalShadesFilled")
  }
}

export default VerticalShadesFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
