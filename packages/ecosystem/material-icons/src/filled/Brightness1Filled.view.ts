import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Brightness1Filled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"10\"/>")
      .name("Brightness1Filled")
  }
}

export default Brightness1Filled as Pretty as Typed<DLightIconType, HTMLSpanElement>
