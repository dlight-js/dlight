import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkUnreadChatAltFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"19\" cy=\"3\" r=\"3\"/><path d=\"M6 8V6h9.03a4.906 4.906 0 0 1-.92-4H4.01a2 2 0 0 0-2 2L2 22l4-4h14c1.1 0 2-.9 2-2V6.97C21.16 7.61 20.13 8 19 8H6zm8 6H6v-2h8v2zm4-3H6V9h12v2z\"/>")
      .name("MarkUnreadChatAltFilled")
  }
}

export default MarkUnreadChatAltFilled as any as Typed<DLightIconType>
