import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellular4BarFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2z\"/>")
      .name("SignalCellular4BarFilled")
  }
}

export default SignalCellular4BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
