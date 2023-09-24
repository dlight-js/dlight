import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BookmarkAddSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 7h-2v2h-2V7h-2V5h2V3h2v2h2v2zm-2 14-7-3-7 3V3h9a5.002 5.002 0 0 0 5 7.9V21z\"/>")
      .name("BookmarkAddSharp")
  }
}

export default BookmarkAddSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
