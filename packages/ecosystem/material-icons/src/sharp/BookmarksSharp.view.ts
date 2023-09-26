import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BookmarksSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 18 2 1V1H7v2h12v15zM17 5H3v18l7-3 7 3V5z\"/>")
      .name("BookmarksSharp")
  }
}

export default BookmarksSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
