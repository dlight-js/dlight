import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StarRateFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z\"/>")
      .name("StarRateFilled")
  }
}

export default StarRateFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
