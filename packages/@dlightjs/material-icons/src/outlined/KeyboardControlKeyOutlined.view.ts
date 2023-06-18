import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardControlKeyOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5 12 1.41 1.41L12 7.83l5.59 5.58L19 12l-7-7z\"/>")
      .name("KeyboardControlKeyOutlined")
  }
}

export default KeyboardControlKeyOutlined as any as Typed<DLightIconType>
