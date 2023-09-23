import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PaddingSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3v18h18V3H3zm6 6H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z\"/>")
      .name("PaddingSharp")
  }
}

export default PaddingSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
