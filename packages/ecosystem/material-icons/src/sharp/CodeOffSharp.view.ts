import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CodeOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19.17 12-4.58-4.59L16 6l6 6-3.59 3.59L17 14.17 19.17 12zM1.39 4.22l4.19 4.19L2 12l6 6 1.41-1.41L4.83 12 7 9.83l12.78 12.78 1.41-1.41L2.81 2.81 1.39 4.22z\"/>")
      .name("CodeOffSharp")
  }
}

export default CodeOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
