import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TrendingFlatFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 12-4-4v3H3v2h15v3z\"/>")
      .name("TrendingFlatFilled")
  }
}

export default TrendingFlatFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
