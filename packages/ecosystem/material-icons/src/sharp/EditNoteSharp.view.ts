import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EditNoteSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13 1.41-1.41 2.12 2.12-1.41 1.41-2.12-2.12zm-.71.71-5.3 5.3V21h2.12l5.3-5.3-2.12-2.12z\"/>")
      .name("EditNoteSharp")
  }
}

export default EditNoteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
