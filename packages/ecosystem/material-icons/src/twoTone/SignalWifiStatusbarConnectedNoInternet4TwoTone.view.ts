import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalWifiStatusbarConnectedNoInternet4TwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 18h2v2h-2zm0-8h2v6h-2z\"/><path d=\"M12 4C7.31 4 3.07 5.9 0 8.98L12 21l5-5.01V8h5.92C19.97 5.51 16.16 4 12 4z\"/>")
      .name("SignalWifiStatusbarConnectedNoInternet4TwoTone")
  }
}

export default SignalWifiStatusbarConnectedNoInternet4TwoTone as any as Typed<DLightIconType>
