import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PermScanWifiTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 5c-3.26 0-6.2.85-9.08 2.65L12 18.83l9.08-11.16C18.18 5.85 15.25 5 12 5zm1 11h-2v-6h2v6zm-2-8V6h2v2h-2z\" opacity=\".3\"/><path d=\"M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zM2.92 7.65C5.8 5.85 8.74 5 12 5c3.25 0 6.18.85 9.08 2.67L12 18.83 2.92 7.65zM11 10h2v6h-2zm0-4h2v2h-2z\"/>")
      .name("PermScanWifiTwoTone")
  }
}

export default PermScanWifiTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
