import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ParkFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21z\"/>")
      .name("ParkFilled")
  }
}

export default ParkFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
