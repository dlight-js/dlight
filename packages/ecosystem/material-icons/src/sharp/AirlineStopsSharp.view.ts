import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AirlineStopsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18.21 9.21C15.93 10.78 13.45 13.3 13 17h2v2H9v-2h2c-.5-4.5-4.37-8-9-8V7c4.39 0 8.22 2.55 10 6.3 1.13-2.43 2.99-4.25 4.78-5.52L14 5h7v7l-2.79-2.79z\"/>")
      .name("AirlineStopsSharp")
  }
}

export default AirlineStopsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
