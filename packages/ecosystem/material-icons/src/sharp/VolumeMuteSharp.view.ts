import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolumeMuteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 9v6h4l5 5V4l-5 5H7z\"/>")
      .name("VolumeMuteSharp")
  }
}

export default VolumeMuteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
