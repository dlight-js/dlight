import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BatteryStdSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h-3V2h-4v2H7v18h10V4z\"/>")
      .name("BatteryStdSharp")
  }
}

export default BatteryStdSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
