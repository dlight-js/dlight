import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RepeatSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z\"/>")
      .name("RepeatSharp")
  }
}

export default RepeatSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
