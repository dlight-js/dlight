import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatItalicTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 15v3h8v-3h-2.21l3.42-8H18V4h-8v3h2.21l-3.42 8z\"/>")
      .name("FormatItalicTwoTone")
  }
}

export default FormatItalicTwoTone as any as Typed<DLightIconType>
