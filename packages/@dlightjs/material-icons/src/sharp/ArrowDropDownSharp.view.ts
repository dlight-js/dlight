import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropDownSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 10 5 5 5-5H7z\"/>")
      .name("ArrowDropDownSharp")
  }
}

export default ArrowDropDownSharp as any as Typed<DLightIconType>
