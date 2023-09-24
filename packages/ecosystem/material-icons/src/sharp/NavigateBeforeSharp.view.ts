import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NavigateBeforeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.61 7.41 14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z\"/>")
      .name("NavigateBeforeSharp")
  }
}

export default NavigateBeforeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
