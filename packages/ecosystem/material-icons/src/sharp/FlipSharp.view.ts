import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlipSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 3v18h6v-2H5V5h4V3H3zm16 0v2h2V3h-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8h2v-2h-2v2z\"/>")
      .name("FlipSharp")
  }
}

export default FlipSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
