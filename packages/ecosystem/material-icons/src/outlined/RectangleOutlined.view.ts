import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RectangleOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v16h20V4H2zm18 14H4V6h16v12z\"/>")
      .name("RectangleOutlined")
  }
}

export default RectangleOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
