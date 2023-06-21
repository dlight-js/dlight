import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SdCardAlertSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2H10L4 8v14h16V2zm-7 15h-2v-2h2v2zm0-4h-2V8h2v5z\"/>")
      .name("SdCardAlertSharp")
  }
}

export default SdCardAlertSharp as any as Typed<DLightIconType>
