import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LibraryMusicSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H6v16h16V2zm-4 5h-3v5.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v16h16v-2H4V6z\"/>")
      .name("LibraryMusicSharp")
  }
}

export default LibraryMusicSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
