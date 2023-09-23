import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChatBubbleOutlineSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20l4-4h16V2zm-2 14H6l-2 2V4h16v12z\"/>")
      .name("ChatBubbleOutlineSharp")
  }
}

export default ChatBubbleOutlineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
