import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalAlignBottomTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 3v10H8l4 4 4-4h-3V3zM4 19h16v2H4z\"/>")
      .name("VerticalAlignBottomTwoTone")
  }
}

export default VerticalAlignBottomTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
