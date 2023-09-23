import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkUnreadChatAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"19\" cy=\"3\" r=\"3\"/><path d=\"M6 8V6h9.03a4.906 4.906 0 0 1-.92-4H2.01L2 22l4-4h16V6.97C21.16 7.61 20.13 8 19 8H6zm8 6H6v-2h8v2zm4-3H6V9h12v2z\"/>")
      .name("MarkUnreadChatAltSharp")
  }
}

export default MarkUnreadChatAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
