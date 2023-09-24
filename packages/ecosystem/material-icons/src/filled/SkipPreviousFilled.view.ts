import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SkipPreviousFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h2v12H6zm3.5 6 8.5 6V6z\"/>")
      .name("SkipPreviousFilled")
  }
}

export default SkipPreviousFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
