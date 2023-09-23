import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LooksOneSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-7 14h-2V9h-2V7h4v10z\"/>")
      .name("LooksOneSharp")
  }
}

export default LooksOneSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
