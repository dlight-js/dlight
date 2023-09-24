import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HotelSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm16-6H11v7H3V5H1v15h2v-3h18v3h2V7z\"/>")
      .name("HotelSharp")
  }
}

export default HotelSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
