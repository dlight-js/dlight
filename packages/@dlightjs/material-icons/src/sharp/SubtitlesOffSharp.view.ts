import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SubtitlesOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6.83 4 8 8H20v2h-3.17L22 19.17V4zm-5.79-.13.96.96V20h15.17l2.96 2.96 1.41-1.41L2.45 2.45 1.04 3.87zM4 12h4v2H4v-2zm0 4h9.17l.83.83V18H4v-2z\"/>")
      .name("SubtitlesOffSharp")
  }
}

export default SubtitlesOffSharp as any as Typed<DLightIconType>
