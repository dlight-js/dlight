import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SouthEastSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9h-2v6.59L5.41 4 4 5.41 15.59 17H9v2h10V9z\"/>")
      .name("SouthEastSharp")
  }
}

export default SouthEastSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
