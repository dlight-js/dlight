import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardControlKeySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5 12 1.41 1.41L12 7.83l5.59 5.58L19 12l-7-7z\"/>")
      .name("KeyboardControlKeySharp")
  }
}

export default KeyboardControlKeySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
