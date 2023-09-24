import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MaximizeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3V3z\"/>")
      .name("MaximizeTwoTone")
  }
}

export default MaximizeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
