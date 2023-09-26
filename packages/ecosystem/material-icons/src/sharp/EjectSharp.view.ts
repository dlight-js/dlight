import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EjectSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h14v2H5v-2zm7-12L5.33 15h13.34L12 5z\"/>")
      .name("EjectSharp")
  }
}

export default EjectSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
