import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EscalatorSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-2.5 6h-3.2l-5 9H5.5v-3h3.2l5-9h4.8v3z\"/>")
      .name("EscalatorSharp")
  }
}

export default EscalatorSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
