import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhonelinkEraseSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13 8.2-1-1-4 4-4-4-1 1 4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4zM21 1H7v5h2V4h10v16H9v-2H7v5h14V1z\"/>")
      .name("PhonelinkEraseSharp")
  }
}

export default PhonelinkEraseSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
