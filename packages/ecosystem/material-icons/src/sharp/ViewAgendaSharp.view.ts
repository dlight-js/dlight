import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewAgendaSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 13h18v8H3zM3 3h18v8H3z\"/>")
      .name("ViewAgendaSharp")
  }
}

export default ViewAgendaSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
