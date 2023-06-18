import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HourglassTopFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6 2 .01 6L10 12l-3.99 4.01L6 22h12v-6l-4-4 4-3.99V2H6zm10 14.5V20H8v-3.5l4-4 4 4z\"/>")
      .name("HourglassTopFilled")
  }
}

export default HourglassTopFilled as any as Typed<DLightIconType>
