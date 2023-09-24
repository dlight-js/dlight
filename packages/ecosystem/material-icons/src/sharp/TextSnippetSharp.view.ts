import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TextSnippetSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 9-6-6H3v18h18V9zM7 7h7v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2z\"/>")
      .name("TextSnippetSharp")
  }
}

export default TextSnippetSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
