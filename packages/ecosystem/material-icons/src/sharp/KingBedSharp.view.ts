import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KingBedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 10V5H4v5H2v7h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-7h-2zm-9 0H6V7h5v3zm7 0h-5V7h5v3z\"/>")
      .name("KingBedSharp")
  }
}

export default KingBedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
