import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NotesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z\"/>")
      .name("NotesSharp")
  }
}

export default NotesSharp as any as Typed<DLightIconType>
