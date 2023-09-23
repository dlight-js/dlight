import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularConnectedNoInternet0BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zm-2-2v2H2L22 2v6h-2V6.83L6.83 20H18z\"/>")
      .name("SignalCellularConnectedNoInternet0BarSharp")
  }
}

export default SignalCellularConnectedNoInternet0BarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
