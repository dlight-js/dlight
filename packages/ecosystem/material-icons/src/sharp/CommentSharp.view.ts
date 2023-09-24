import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CommentSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21.99 2H2v16h16l4 4-.01-20zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z\"/>")
      .name("CommentSharp")
  }
}

export default CommentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
