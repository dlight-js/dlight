import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ExpandLessSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z\"/>")
      .name("ExpandLessSharp")
  }
}

export default ExpandLessSharp as any as Typed<DLightIconType>
