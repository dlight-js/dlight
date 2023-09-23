import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatStrikethroughTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 12h18v2H3zm11-2V7h5V4H5v3h5v3zm-4 6h4v3h-4z\"/>")
      .name("FormatStrikethroughTwoTone")
  }
}

export default FormatStrikethroughTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
