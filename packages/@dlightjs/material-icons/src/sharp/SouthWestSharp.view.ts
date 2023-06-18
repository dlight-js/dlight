import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthWestSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z\"/>")
      .name("SouthWestSharp")
  }
}

export default SouthWestSharp as any as Typed<DLightIconType>
