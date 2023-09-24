import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MarginFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2zM7 7h2v2H7zm8 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z\"/>")
      .name("MarginFilled")
  }
}

export default MarginFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
