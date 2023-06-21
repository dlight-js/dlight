import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StairsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3v18h18V3H3zm15 5h-2.42v3.33H13v3.33h-2.58V18H6v-2h2.42v-3.33H11V9.33h2.58V6H18v2z\"/>")
      .name("StairsSharp")
  }
}

export default StairsSharp as any as Typed<DLightIconType>
