import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalWifiStatusbar4BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z\"/>")
      .name("SignalWifiStatusbar4BarSharp")
  }
}

export default SignalWifiStatusbar4BarSharp as any as Typed<DLightIconType>
