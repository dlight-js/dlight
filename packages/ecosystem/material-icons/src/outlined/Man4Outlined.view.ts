import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man4Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.75 7h-3.5C9.04 7 8.11 8.07 8.27 9.26L10 22h4l1.73-12.74C15.89 8.07 14.96 7 13.75 7z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Man4Outlined")
  }
}

export default Man4Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
