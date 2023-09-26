import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChargingStationSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14.5 11-3 6v-4h-2l3-6v4h2zM5 1h14v22H5V1zm2 5v12h10V6H7z\"/>")
      .name("ChargingStationSharp")
  }
}

export default ChargingStationSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
