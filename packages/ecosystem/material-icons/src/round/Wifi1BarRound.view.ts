import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Wifi1BarRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"18\" r=\"2\"/>")
      .name("Wifi1BarRound")
  }
}

export default Wifi1BarRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
