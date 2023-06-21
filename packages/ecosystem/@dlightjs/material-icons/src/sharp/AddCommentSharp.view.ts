import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddCommentSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v16h16l4 4V2zm-5 9h-4v4h-2v-4H7V9h4V5h2v4h4v2z\"/>")
      .name("AddCommentSharp")
  }
}

export default AddCommentSharp as any as Typed<DLightIconType>
