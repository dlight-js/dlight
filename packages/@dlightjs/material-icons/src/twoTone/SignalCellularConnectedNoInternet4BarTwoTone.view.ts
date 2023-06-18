import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularConnectedNoInternet4BarTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z\"/>")
      .name("SignalCellularConnectedNoInternet4BarTwoTone")
  }
}

export default SignalCellularConnectedNoInternet4BarTwoTone as any as Typed<DLightIconType>
