import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineSeatLegroomNormalSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 15V3H3v14h11v-2H5zm17 3h-3v-7c0-1.1-.9-2-2-2h-5V3H6v11h10v7h6v-3z\"/>")
      .name("AirlineSeatLegroomNormalSharp")
  }
}

export default AirlineSeatLegroomNormalSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
