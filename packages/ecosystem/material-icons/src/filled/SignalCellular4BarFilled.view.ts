import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellular4BarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2z\"/>")
      .name("SignalCellular4BarFilled")
  }
}

export default SignalCellular4BarFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
