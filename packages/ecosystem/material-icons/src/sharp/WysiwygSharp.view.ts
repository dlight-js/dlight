import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WysiwygSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 12H7v-2h10v2zm-4 2H7v2h6v-2zm8 7H3V3h18v18zM19 7H5v12h14V7z\"/>")
      .name("WysiwygSharp")
  }
}

export default WysiwygSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
