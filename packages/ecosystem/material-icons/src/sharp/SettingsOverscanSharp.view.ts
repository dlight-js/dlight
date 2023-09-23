import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SettingsOverscanSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.01 5.5 10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm9-13H1v18h22V3zm-2 16.01H3V4.99h18v14.02z\"/>")
      .name("SettingsOverscanSharp")
  }
}

export default SettingsOverscanSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
