import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MailSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2v16h20V4zm-2 4-8 5-8-5V6l8 5 8-5v2z\"/>")
      .name("MailSharp")
  }
}

export default MailSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
