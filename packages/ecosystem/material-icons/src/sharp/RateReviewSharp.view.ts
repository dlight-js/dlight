import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RateReviewSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20l4-4h16V2zM6 14v-2.47l6.88-6.88c.2-.2.51-.2.71 0l1.77 1.77c.2.2.2.51 0 .71L8.47 14H6zm12 0h-7.5l2-2H18v2z\"/>")
      .name("RateReviewSharp")
  }
}

export default RateReviewSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
