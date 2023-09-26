import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BeenhereSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3.01 1 3 17l9 6 8.99-6L21 1H3.01zM10 16l-5-5 1.41-1.42L10 13.17l7.59-7.59L19 7l-9 9z\"/>")
      .name("BeenhereSharp")
  }
}

export default BeenhereSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
