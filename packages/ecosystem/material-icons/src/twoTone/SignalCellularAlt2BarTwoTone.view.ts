import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SignalCellularAlt2BarTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14h3v6H5v-6zm6-5h3v11h-3V9z\"/>")
      .name("SignalCellularAlt2BarTwoTone")
  }
}

export default SignalCellularAlt2BarTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
