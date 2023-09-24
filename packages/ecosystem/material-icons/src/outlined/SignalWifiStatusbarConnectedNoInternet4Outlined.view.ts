import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalWifiStatusbarConnectedNoInternet4Outlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4C7.31 4 3.07 5.9 0 8.98L12 21l5-5.01V8h5.92C19.97 5.51 16.16 4 12 4zm7 14h2v2h-2z\"/><path d=\"M19 10h2v6h-2z\"/>")
      .name("SignalWifiStatusbarConnectedNoInternet4Outlined")
  }
}

export default SignalWifiStatusbarConnectedNoInternet4Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
