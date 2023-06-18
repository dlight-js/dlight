import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default SignalCellular4BarFilled as any as Typed<DLightIconType>
