import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularOffFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 1-8.59 8.59L21 18.18V1zM4.77 4.5 3.5 5.77l6.36 6.36L1 21h17.73l2 2L22 21.73 4.77 4.5z\"/>")
      .name("SignalCellularOffFilled")
  }
}

export default SignalCellularOffFilled as any as Typed<DLightIconType>
