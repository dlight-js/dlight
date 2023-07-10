import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalWifiStatusbar4BarRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4C7.7 4 3.78 5.6.79 8.24.35 8.63.32 9.3.73 9.71l10.56 10.58c.39.39 1.02.39 1.42 0L23.27 9.71c.41-.41.38-1.08-.06-1.47A16.871 16.871 0 0 0 12 4z\"/>")
      .name("SignalWifiStatusbar4BarRound")
  }
}

export default SignalWifiStatusbar4BarRound as any as Typed<DLightIconType>
