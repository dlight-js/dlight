import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NotesSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11.01 3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z\"/>")
      .name("NotesSharp")
  }
}

export default NotesSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
