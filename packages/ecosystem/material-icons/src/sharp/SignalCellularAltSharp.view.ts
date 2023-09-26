import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularAltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h3v16h-3V4zM5 14h3v6H5v-6zm6-5h3v11h-3V9z\"/>")
      .name("SignalCellularAltSharp")
  }
}

export default SignalCellularAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
