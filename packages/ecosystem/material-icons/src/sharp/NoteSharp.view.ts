import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m22 10-6-6H2v16h20V10zm-7-4.5 5.5 5.5H15V5.5z\"/>")
      .name("NoteSharp")
  }
}

export default NoteSharp as any as Typed<DLightIconType>
