import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropDownFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 10 5 5 5-5z\"/>")
      .name("ArrowDropDownFilled")
  }
}

export default ArrowDropDownFilled as any as Typed<DLightIconType>
