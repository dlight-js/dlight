import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalAlignCenterFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z\"/>")
      .name("VerticalAlignCenterFilled")
  }
}

export default VerticalAlignCenterFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
