import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NavigateBeforeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14.2 6-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z\"/>")
      .name("NavigateBeforeTwoTone")
  }
}

export default NavigateBeforeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
