import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularConnectedNoInternet0BarRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 18c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .55.45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-3-2v2H2L22 2v6h-2V6.83L6.83 20H18z\"/>")
      .name("SignalCellularConnectedNoInternet0BarRound")
  }
}

export default SignalCellularConnectedNoInternet0BarRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
