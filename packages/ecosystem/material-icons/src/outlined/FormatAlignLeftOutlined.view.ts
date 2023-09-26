import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatAlignLeftOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z\"/>")
      .name("FormatAlignLeftOutlined")
  }
}

export default FormatAlignLeftOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
