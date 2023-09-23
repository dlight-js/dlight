import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WidthNormalOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h4v12H4zm6 0V6h4v12h-4zm10 0h-4V6h4v12z\"/>")
      .name("WidthNormalOutlined")
  }
}

export default WidthNormalOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
