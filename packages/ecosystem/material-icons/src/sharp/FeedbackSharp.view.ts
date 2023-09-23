import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FeedbackSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2.01L2 22l4-4h16V2zm-9 12h-2v-2h2v2zm0-4h-2V6h2v4z\"/>")
      .name("FeedbackSharp")
  }
}

export default FeedbackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
