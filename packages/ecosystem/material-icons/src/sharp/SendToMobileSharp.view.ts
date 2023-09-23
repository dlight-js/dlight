import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendToMobileSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 18H7V6h10v1h2V1H5v22h14v-6h-2z\"/><path d=\"m22 12-4-4v3h-5v2h5v3z\"/>")
      .name("SendToMobileSharp")
  }
}

export default SendToMobileSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
