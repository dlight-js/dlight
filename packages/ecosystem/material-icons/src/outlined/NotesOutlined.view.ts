import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NotesOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z\"/>")
      .name("NotesOutlined")
  }
}

export default NotesOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
