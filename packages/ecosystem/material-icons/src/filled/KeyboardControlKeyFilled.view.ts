import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardControlKeyFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5 12 1.41 1.41L12 7.83l5.59 5.58L19 12l-7-7z\"/>")
      .name("KeyboardControlKeyFilled")
  }
}

export default KeyboardControlKeyFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
