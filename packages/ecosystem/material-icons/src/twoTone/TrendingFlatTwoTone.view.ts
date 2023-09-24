import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TrendingFlatTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 12-4-4v3H3v2h15v3l4-4z\"/>")
      .name("TrendingFlatTwoTone")
  }
}

export default TrendingFlatTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
