import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatAlignRightTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3zm6 4h12v2H9zm0-8h12v2H9z\"/>")
      .name("FormatAlignRightTwoTone")
  }
}

export default FormatAlignRightTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
