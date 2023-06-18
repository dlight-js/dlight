import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatItalicFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z\"/>")
      .name("FormatItalicFilled")
  }
}

export default FormatItalicFilled as any as Typed<DLightIconType>
