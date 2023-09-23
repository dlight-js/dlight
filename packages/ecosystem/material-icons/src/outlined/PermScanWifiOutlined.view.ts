import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PermScanWifiOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zM2.92 7.65C5.8 5.85 8.74 5 12 5c3.25 0 6.18.85 9.08 2.67L12 18.83 2.92 7.65zM11 10h2v6h-2zm0-4h2v2h-2z\"/>")
      .name("PermScanWifiOutlined")
  }
}

export default PermScanWifiOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
