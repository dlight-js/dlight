import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularAlt1BarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14h3v6H5v-6z\"/>")
      .name("SignalCellularAlt1BarFilled")
  }
}

export default SignalCellularAlt1BarFilled as any as Typed<DLightIconType>
