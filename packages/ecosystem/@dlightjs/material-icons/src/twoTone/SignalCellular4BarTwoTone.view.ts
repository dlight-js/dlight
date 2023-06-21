import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellular4BarTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2L2 22z\"/>")
      .name("SignalCellular4BarTwoTone")
  }
}

export default SignalCellular4BarTwoTone as any as Typed<DLightIconType>
