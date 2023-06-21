import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ChatBubbleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4 18 2-2h14V4H4z\" opacity=\".3\"/><path d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z\"/>")
      .name("ChatBubbleTwoTone")
  }
}

export default ChatBubbleTwoTone as any as Typed<DLightIconType>
