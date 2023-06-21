import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatQuoteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 17h3l2-4V7H4v6h3l-2 4zm10 0h3l2-4V7h-6v6h3l-2 4z\"/>")
      .name("FormatQuoteSharp")
  }
}

export default FormatQuoteSharp as any as Typed<DLightIconType>
