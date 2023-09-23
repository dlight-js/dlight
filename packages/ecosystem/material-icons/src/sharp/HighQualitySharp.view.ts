import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HighQualitySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 4H3v16h18V4zM11 15H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7 0h-1.75v1.5h-1.5V15H13V9h5v6zm-3.5-1.5h2v-3h-2v3z\"/>")
      .name("HighQualitySharp")
  }
}

export default HighQualitySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
