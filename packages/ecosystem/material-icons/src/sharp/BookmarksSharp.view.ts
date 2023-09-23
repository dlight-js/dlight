import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarksSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 18 2 1V1H7v2h12v15zM17 5H3v18l7-3 7 3V5z\"/>")
      .name("BookmarksSharp")
  }
}

export default BookmarksSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
