import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CollectionsBookmarkFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z\"/><path d=\"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10-2.5-1.5L15 12V4h5v8z\"/>")
      .name("CollectionsBookmarkFilled")
  }
}

export default CollectionsBookmarkFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
