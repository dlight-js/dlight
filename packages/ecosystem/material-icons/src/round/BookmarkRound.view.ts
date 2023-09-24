import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BookmarkRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z\"/>")
      .name("BookmarkRound")
  }
}

export default BookmarkRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
