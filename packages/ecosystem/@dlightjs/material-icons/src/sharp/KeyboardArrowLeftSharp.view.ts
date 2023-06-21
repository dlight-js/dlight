import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardArrowLeftSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z\"/>")
      .name("KeyboardArrowLeftSharp")
  }
}

export default KeyboardArrowLeftSharp as any as Typed<DLightIconType>
