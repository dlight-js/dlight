import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class UnfoldMoreSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z\"/>")
      .name("UnfoldMoreSharp")
  }
}

export default UnfoldMoreSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
