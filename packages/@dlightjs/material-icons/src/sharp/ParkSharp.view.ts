import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ParkSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 12h2L12 2 5.05 12H7l-3.9 6h6.92v4h3.96v-4H21z\"/>")
      .name("ParkSharp")
  }
}

export default ParkSharp as any as Typed<DLightIconType>
