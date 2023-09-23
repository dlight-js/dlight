import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PinInvokeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 12v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10v2H4v12h16v-6h2zm0-5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zM9.34 12h2.24l-2.95 2.95 1.41 1.41L13 13.42v2.24h2V10H9.34v2z\"/>")
      .name("PinInvokeOutlined")
  }
}

export default PinInvokeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
