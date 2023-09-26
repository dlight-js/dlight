import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SkipPreviousSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z\"/>")
      .name("SkipPreviousSharp")
  }
}

export default SkipPreviousSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
