import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default CallToActionSharp as any as Typed<DLightIconType>
