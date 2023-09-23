import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotationAngleupSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16.76 9 1.41 1.41-9.19 9.19 1.41 1.41 9.19-9.19L21 13.24V9h-4.24zm-8.28 3.75 3.54-3.54 2.19.92 1.48-1.48L4.56 4.23 3.5 5.29l4.42 11.14 1.48-1.48-.92-2.2zm-.82-1.72L5.43 6.16l4.87 2.23-2.64 2.64z\"/>")
      .name("TextRotationAngleupSharp")
  }
}

export default TextRotationAngleupSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
