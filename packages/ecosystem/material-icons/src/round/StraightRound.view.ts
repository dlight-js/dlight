import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StraightRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13 6.83.88.88a.996.996 0 1 0 1.41-1.41L12.7 3.71a.996.996 0 0 0-1.41 0L8.71 6.29a.996.996 0 1 0 1.41 1.41l.88-.87V20c0 .55.45 1 1 1s1-.45 1-1V6.83z\"/>")
      .name("StraightRound")
  }
}

export default StraightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
