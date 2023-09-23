import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkChatReadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.03 17.5c-.02.17-.03.33-.03.5H6l-4 4V2h20v8.68A6.995 6.995 0 0 0 12 17c0 .17.01.33.03.5zM23 14.34l-1.41-1.41-4.24 4.24-2.12-2.12-1.41 1.41L17.34 20 23 14.34z\"/>")
      .name("MarkChatReadSharp")
  }
}

export default MarkChatReadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
