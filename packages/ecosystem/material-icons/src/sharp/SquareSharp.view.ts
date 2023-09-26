import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SquareSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v18H3z\"/>")
      .name("SquareSharp")
  }
}

export default SquareSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
