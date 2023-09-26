import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularConnectedNoInternet4BarFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z\"/>")
      .name("SignalCellularConnectedNoInternet4BarFilled")
  }
}

export default SignalCellularConnectedNoInternet4BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
