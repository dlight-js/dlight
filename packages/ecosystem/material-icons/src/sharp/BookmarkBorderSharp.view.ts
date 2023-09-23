import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkBorderSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5v18l7-3 7 3V3zm-2 15-5-2.18L7 18V5h10v13z\"/>")
      .name("BookmarkBorderSharp")
  }
}

export default BookmarkBorderSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
