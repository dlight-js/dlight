import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BatteryAlertSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h-3V2h-4v2H7v18h10V4zm-4 14h-2v-2h2v2zm0-4h-2V9h2v5z\"/>")
      .name("BatteryAlertSharp")
  }
}

export default BatteryAlertSharp as any as Typed<DLightIconType>
