import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookmarkRemoveFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7h-6V5h6v2zm-2 3.9A5.002 5.002 0 0 1 14 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V10.9z\"/>")
      .name("BookmarkRemoveFilled")
  }
}

export default BookmarkRemoveFilled as any as Typed<DLightIconType>
