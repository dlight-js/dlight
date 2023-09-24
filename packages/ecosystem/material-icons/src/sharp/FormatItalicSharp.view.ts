import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatItalicSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z\"/>")
      .name("FormatItalicSharp")
  }
}

export default FormatItalicSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
