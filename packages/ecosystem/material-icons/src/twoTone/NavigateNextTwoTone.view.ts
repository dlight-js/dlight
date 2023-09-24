import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NavigateNextTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m10.02 18 6-6-6-6-1.41 1.41L13.19 12l-4.58 4.59z\"/>")
      .name("NavigateNextTwoTone")
  }
}

export default NavigateNextTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
