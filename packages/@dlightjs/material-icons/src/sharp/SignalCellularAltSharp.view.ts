import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h3v16h-3V4zM5 14h3v6H5v-6zm6-5h3v11h-3V9z\"/>")
      .name("SignalCellularAltSharp")
  }
}

export default SignalCellularAltSharp as any as Typed<DLightIconType>
