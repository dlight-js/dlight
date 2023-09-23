import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SegmentSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 18h12v-2H9v2zM3 6v2h18V6H3zm6 7h12v-2H9v2z\"/>")
      .name("SegmentSharp")
  }
}

export default SegmentSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
