import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatStrikethroughOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z\"/>")
      .name("FormatStrikethroughOutlined")
  }
}

export default FormatStrikethroughOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
