import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SettingsSystemDaydreamOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 17H9c-2.21 0-4-1.79-4-4a3.98 3.98 0 0 1 3.22-3.92A4.514 4.514 0 0 1 12 7c1.95 0 3.66 1.28 4.26 3.09 1.58.36 2.74 1.75 2.74 3.41 0 1.93-1.57 3.5-3.5 3.5zm-6.76-5.98C7.74 11.15 7 11.99 7 13c0 1.1.9 2 2 2h6.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.87l-.17-.86A2.496 2.496 0 0 0 12 9c-.96 0-1.84.57-2.26 1.45l-.27.57h-.73zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z\"/>")
      .name("SettingsSystemDaydreamOutlined")
  }
}

export default SettingsSystemDaydreamOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
