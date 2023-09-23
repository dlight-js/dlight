import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthWestFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z\"/>")
      .name("SouthWestFilled")
  }
}

export default SouthWestFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
