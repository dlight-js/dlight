import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BookmarkTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 17.97 5-2.15 5 2.15V5H7z\" opacity=\".3\"/><path d=\"M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 14.97-5-2.14-5 2.14V5h10v12.97z\"/>")
      .name("BookmarkTwoTone")
  }
}

export default BookmarkTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
