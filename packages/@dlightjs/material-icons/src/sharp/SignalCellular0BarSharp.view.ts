import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellular0BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2L2 22zm18-2H6.83L20 6.83V20z\"/>")
      .name("SignalCellular0BarSharp")
  }
}

export default SignalCellular0BarSharp as any as Typed<DLightIconType>