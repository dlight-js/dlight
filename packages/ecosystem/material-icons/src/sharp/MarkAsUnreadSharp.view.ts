import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkAsUnreadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.23 7h4.12L10.5 2 2 6.21V17h2V7.4L10.5 4z\"/><path d=\"M5 8v13h17V8H5zm15 4-6.5 3.33L7 12v-2l6.5 3.33L20 10v2z\"/>")
      .name("MarkAsUnreadSharp")
  }
}

export default MarkAsUnreadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
