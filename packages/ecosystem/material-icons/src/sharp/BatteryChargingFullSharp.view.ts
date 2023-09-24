import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BatteryChargingFullSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h-3V2h-4v2H7v18h10V4zm-6 16v-5.5H9L13 7v5.5h2L11 20z\"/>")
      .name("BatteryChargingFullSharp")
  }
}

export default BatteryChargingFullSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
