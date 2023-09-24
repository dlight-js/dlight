import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoubleArrowSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 5H11l5 7-5 7h4.5l5-7z\"/><path d=\"M8.5 5H4l5 7-5 7h4.5l5-7z\"/>")
      .name("DoubleArrowSharp")
  }
}

export default DoubleArrowSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
