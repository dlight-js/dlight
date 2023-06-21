import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SortSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z\"/>")
      .name("SortSharp")
  }
}

export default SortSharp as any as Typed<DLightIconType>
