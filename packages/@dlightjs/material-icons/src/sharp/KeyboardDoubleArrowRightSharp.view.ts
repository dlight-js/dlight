import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardDoubleArrowRightSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z\"/><path d=\"m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z\"/>")
      .name("KeyboardDoubleArrowRightSharp")
  }
}

export default KeyboardDoubleArrowRightSharp as any as Typed<DLightIconType>
