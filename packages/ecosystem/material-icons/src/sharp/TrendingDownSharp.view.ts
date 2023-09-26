import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TrendingDownSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z\"/>")
      .name("TrendingDownSharp")
  }
}

export default TrendingDownSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
