import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class MarkChatUnreadFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6.98V16c0 1.1-.9 2-2 2H6l-4 4V4c0-1.1.9-2 2-2h10.1A5.002 5.002 0 0 0 19 8c1.13 0 2.16-.39 3-1.02zM16 3c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"/>")
      .name("MarkChatUnreadFilled")
  }
}

export default MarkChatUnreadFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
