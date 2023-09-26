import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BookmarkBorderSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5v18l7-3 7 3V3zm-2 15-5-2.18L7 18V5h10v13z\"/>")
      .name("BookmarkBorderSharp")
  }
}

export default BookmarkBorderSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
