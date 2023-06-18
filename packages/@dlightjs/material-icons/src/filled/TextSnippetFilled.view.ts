import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextSnippetFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20.41 8.41-4.83-4.83c-.37-.37-.88-.58-1.41-.58H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.42zM7 7h7v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2z\"/>")
      .name("TextSnippetFilled")
  }
}

export default TextSnippetFilled as any as Typed<DLightIconType>
