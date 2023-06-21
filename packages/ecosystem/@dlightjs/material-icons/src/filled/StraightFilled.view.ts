import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StraightFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 6.83 9.41 8.41 8 7l4-4 4 4-1.41 1.41L13 6.83V21h-2z\"/>")
      .name("StraightFilled")
  }
}

export default StraightFilled as any as Typed<DLightIconType>
