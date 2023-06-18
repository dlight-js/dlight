import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NotesFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z\"/>")
      .name("NotesFilled")
  }
}

export default NotesFilled as any as Typed<DLightIconType>
