import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularAltFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h3v16h-3zM5 14h3v6H5zm6-5h3v11h-3z\"/>")
      .name("SignalCellularAltFilled")
  }
}

export default SignalCellularAltFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
