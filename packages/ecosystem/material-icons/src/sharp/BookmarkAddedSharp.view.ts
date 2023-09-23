import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkAddedSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 21-7-3-7 3V3h9a5.002 5.002 0 0 0 5 7.9V21zM17.83 9 15 6.17l1.41-1.41 1.41 1.41 3.54-3.54 1.41 1.41L17.83 9z\"/>")
      .name("BookmarkAddedSharp")
  }
}

export default BookmarkAddedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
