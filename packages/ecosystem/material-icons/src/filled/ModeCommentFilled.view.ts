import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ModeCommentFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z\"/>")
      .name("ModeCommentFilled")
  }
}

export default ModeCommentFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
