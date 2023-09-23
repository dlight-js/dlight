import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalAlignCenterTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 1v4H8l4 4 4-4h-3V1zM4 11h16v2H4zm4 8h3v4h2v-4h3l-4-4z\"/>")
      .name("VerticalAlignCenterTwoTone")
  }
}

export default VerticalAlignCenterTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
