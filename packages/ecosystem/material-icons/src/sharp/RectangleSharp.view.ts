import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RectangleSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4h20v16H2z\"/>")
      .name("RectangleSharp")
  }
}

export default RectangleSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
