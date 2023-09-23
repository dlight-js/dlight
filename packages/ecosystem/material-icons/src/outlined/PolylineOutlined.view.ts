import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PolylineOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 16v1.26l-6-3v-3.17L11.7 8H16V2h-6v4.9L7.3 10H3v6h5l7 3.5V22h6v-6h-6zM12 4h2v2h-2V4zM7 14H5v-2h2v2zm12 6h-2v-2h2v2z\"/>")
      .name("PolylineOutlined")
  }
}

export default PolylineOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
