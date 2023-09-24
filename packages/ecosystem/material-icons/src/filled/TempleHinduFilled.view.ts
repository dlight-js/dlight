import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TempleHinduFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.6 11h10.8l-.9-3h-9zM20 11v2H4v-2H2v11h8v-5h4v5h8V11zm-4.1-5L15 3V1h-2v2h-2.03V1h-2v2.12L8.1 6z\"/>")
      .name("TempleHinduFilled")
  }
}

export default TempleHinduFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
