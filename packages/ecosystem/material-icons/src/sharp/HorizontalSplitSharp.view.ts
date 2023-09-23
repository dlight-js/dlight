import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HorizontalSplitSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 19h18v-6H3v6zm0-8h18V9H3v2zm0-6v2h18V5H3z\"/>")
      .name("HorizontalSplitSharp")
  }
}

export default HorizontalSplitSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
