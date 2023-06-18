import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularOffTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 1-8.31 8.31 8.31 8.3zM4.91 4.36 3.5 5.77l6.36 6.37L1 21h17.73l2 2 1.41-1.41z\"/>")
      .name("SignalCellularOffTwoTone")
  }
}

export default SignalCellularOffTwoTone as any as Typed<DLightIconType>
