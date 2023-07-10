import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Wifi1BarRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"18\" r=\"2\"/>")
      .name("Wifi1BarRound")
  }
}

export default Wifi1BarRound as any as Typed<DLightIconType>
