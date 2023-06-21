import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalAlignBottomSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z\"/>")
      .name("VerticalAlignBottomSharp")
  }
}

export default VerticalAlignBottomSharp as any as Typed<DLightIconType>
