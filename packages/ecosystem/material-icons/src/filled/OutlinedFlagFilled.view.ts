import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class OutlinedFlagFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m14 6-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z\"/>")
      .name("OutlinedFlagFilled")
  }
}

export default OutlinedFlagFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
