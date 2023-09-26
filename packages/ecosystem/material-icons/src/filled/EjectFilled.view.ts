import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EjectFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h14v2H5zm7-12L5.33 15h13.34z\"/>")
      .name("EjectFilled")
  }
}

export default EjectFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
