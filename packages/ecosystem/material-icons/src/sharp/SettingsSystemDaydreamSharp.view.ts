import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SettingsSystemDaydreamSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16h6.5a2.5 2.5 0 0 0 0-5h-.05c-.24-1.69-1.69-3-3.45-3-1.4 0-2.6.83-3.16 2.02h-.16A2.994 2.994 0 0 0 6 13c0 1.66 1.34 3 3 3zM23 3H1v18h22V3zm-2 16.01H3V4.99h18v14.02z\"/>")
      .name("SettingsSystemDaydreamSharp")
  }
}

export default SettingsSystemDaydreamSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
