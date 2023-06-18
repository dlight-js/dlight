import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularAltFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h3v16h-3zM5 14h3v6H5zm6-5h3v11h-3z\"/>")
      .name("SignalCellularAltFilled")
  }
}

export default SignalCellularAltFilled as any as Typed<DLightIconType>
