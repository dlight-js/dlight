import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineSeatLegroomExtraSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 3H2v14h11v-2H4zm18.24 12.96-2.53 1.15-3.41-6.98A2.019 2.019 0 0 0 14.51 9H11V3H5v11h10l3.41 7 5.07-2.32-1.24-2.72z\"/>")
      .name("AirlineSeatLegroomExtraSharp")
  }
}

export default AirlineSeatLegroomExtraSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
