import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LibraryAddCheckSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H6v16h16V2zm-9.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v16h16v-2H4V6z\"/>")
      .name("LibraryAddCheckSharp")
  }
}

export default LibraryAddCheckSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
