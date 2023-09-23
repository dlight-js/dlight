import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CallToActionSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v18h22V3zm-2 16H3v-3h18v3z\"/>")
      .name("CallToActionSharp")
  }
}

export default CallToActionSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
