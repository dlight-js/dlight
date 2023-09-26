import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularNoSimSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3h-9L7.95 5.06 19 16.11zm-15.21.74L2.38 5.15 5 7.77V21h13.23l1.62 1.62 1.41-1.41z\"/>")
      .name("SignalCellularNoSimSharp")
  }
}

export default SignalCellularNoSimSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
