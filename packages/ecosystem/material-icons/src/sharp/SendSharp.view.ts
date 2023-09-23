import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SendSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7z\"/>")
      .name("SendSharp")
  }
}

export default SendSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
