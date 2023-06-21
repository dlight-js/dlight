import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NorthSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5 9 1.41 1.41L11 5.83V22h2V5.83l4.59 4.59L19 9l-7-7-7 7z\"/>")
      .name("NorthSharp")
  }
}

export default NorthSharp as any as Typed<DLightIconType>
