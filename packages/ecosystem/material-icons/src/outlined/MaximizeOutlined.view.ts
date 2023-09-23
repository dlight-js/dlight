import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MaximizeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v2H3V3z\"/>")
      .name("MaximizeOutlined")
  }
}

export default MaximizeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
