import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AddCommentSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v16h16l4 4V2zm-5 9h-4v4h-2v-4H7V9h4V5h2v4h4v2z\"/>")
      .name("AddCommentSharp")
  }
}

export default AddCommentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
