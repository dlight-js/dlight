import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HorizontalRuleOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path fill-rule=\"evenodd\" d=\"M4 11h16v2H4z\"/>")
      .name("HorizontalRuleOutlined")
  }
}

export default HorizontalRuleOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
