import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChairAltFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h1v2H7c-1.1 0-2 .9-2 2v7h2v-3h10v3h2v-7c0-1.1-.9-2-2-2h-1v-2h1zM7 8V5h10v3H7zm10 8H7v-2h10v2zm-3-4h-4v-2h4v2z\"/>")
      .name("ChairAltFilled")
  }
}

export default ChairAltFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
