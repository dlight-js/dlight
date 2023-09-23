import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CommentBankSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 2v20l4-4h16V2H2zm17 11-2.5-1.5L14 13V5h5v8z\"/>")
      .name("CommentBankSharp")
  }
}

export default CommentBankSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
