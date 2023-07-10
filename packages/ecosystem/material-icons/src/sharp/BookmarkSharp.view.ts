import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5v18l7-3 7 3V3z\"/>")
      .name("BookmarkSharp")
  }
}

export default BookmarkSharp as any as Typed<DLightIconType>
