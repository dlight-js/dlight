import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SubtitlesOffSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6.83 4 8 8H20v2h-3.17L22 19.17V4zm-5.79-.13.96.96V20h15.17l2.96 2.96 1.41-1.41L2.45 2.45 1.04 3.87zM4 12h4v2H4v-2zm0 4h9.17l.83.83V18H4v-2z\"/>")
      .name("SubtitlesOffSharp")
  }
}

export default SubtitlesOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
