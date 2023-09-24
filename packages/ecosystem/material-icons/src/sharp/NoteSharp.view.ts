import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NoteSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 10-6-6H2v16h20V10zm-7-4.5 5.5 5.5H15V5.5z\"/>")
      .name("NoteSharp")
  }
}

export default NoteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
