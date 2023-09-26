import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PictureInPictureAltFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z\"/>")
      .name("PictureInPictureAltFilled")
  }
}

export default PictureInPictureAltFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
