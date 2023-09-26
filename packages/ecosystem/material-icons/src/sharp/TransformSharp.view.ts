import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TransformSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 18v-2H8V4h2L7 1 4 4h2v2H2v2h4v10h10v2h-2l3 3 3-3h-2v-2h4zM10 8h6v6h2V6h-8v2z\"/>")
      .name("TransformSharp")
  }
}

export default TransformSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
