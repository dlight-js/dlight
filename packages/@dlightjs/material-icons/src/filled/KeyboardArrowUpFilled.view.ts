import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardArrowUpFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z\"/>")
      .name("KeyboardArrowUpFilled")
  }
}

export default KeyboardArrowUpFilled as any as Typed<DLightIconType>
