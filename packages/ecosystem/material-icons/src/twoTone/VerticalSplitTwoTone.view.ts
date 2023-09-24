import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalSplitTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 7h4v10h-4z\" opacity=\".3\"/><path d=\"M3 13h8v2H3zm0 4h8v2H3zm0-8h8v2H3zm0-4h8v2H3zm10 0v14h8V5h-8zm6 12h-4V7h4v10z\"/>")
      .name("VerticalSplitTwoTone")
  }
}

export default VerticalSplitTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
