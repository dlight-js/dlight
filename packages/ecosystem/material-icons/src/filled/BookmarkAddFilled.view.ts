import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkAddFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7h-2v2h-2V7h-2V5h2V3h2v2h2v2zm-2 14-7-3-7 3V5c0-1.1.9-2 2-2h7a5.002 5.002 0 0 0 5 7.9V21z\"/>")
      .name("BookmarkAddFilled")
  }
}

export default BookmarkAddFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
