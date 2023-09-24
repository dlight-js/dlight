import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChatBubbleOutlineSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20l4-4h16V2zm-2 14H6l-2 2V4h16v12z\"/>")
      .name("ChatBubbleOutlineSharp")
  }
}

export default ChatBubbleOutlineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
