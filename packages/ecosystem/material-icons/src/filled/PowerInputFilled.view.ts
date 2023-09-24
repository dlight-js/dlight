import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PowerInputFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z\"/>")
      .name("PowerInputFilled")
  }
}

export default PowerInputFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
