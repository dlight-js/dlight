import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PriceCheckSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 8H6V6h5V4H8.5V3h-2v1H4v6h5v2H4v2h2.5v1h2v-1H11zm8.59 4.52-5.66 5.65-2.83-2.83-1.41 1.42L13.93 21 21 13.93z\"/>")
      .name("PriceCheckSharp")
  }
}

export default PriceCheckSharp as any as Typed<DLightIconType>
