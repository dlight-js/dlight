import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularAlt1BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 14h3v6H5v-6z\"/>")
      .name("SignalCellularAlt1BarSharp")
  }
}

export default SignalCellularAlt1BarSharp as any as Typed<DLightIconType>
