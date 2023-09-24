import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChatBubbleSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20l4-4h16V2z\"/>")
      .name("ChatBubbleSharp")
  }
}

export default ChatBubbleSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
