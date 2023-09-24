import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowForwardTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z\"/>")
      .name("ArrowForwardTwoTone")
  }
}

export default ArrowForwardTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
