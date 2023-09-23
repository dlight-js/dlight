import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AutoAwesomeMosaicSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 21h8V3H3v18zM21 3h-8v8h8V3zm-8 18h8v-8h-8v8z\"/>")
      .name("AutoAwesomeMosaicSharp")
  }
}

export default AutoAwesomeMosaicSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
