import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkChatUnreadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6.98V18H6l-4 4V2h12.1A5.002 5.002 0 0 0 19 8c1.13 0 2.16-.39 3-1.02zM16 3c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"/>")
      .name("MarkChatUnreadSharp")
  }
}

export default MarkChatUnreadSharp as any as Typed<DLightIconType>
