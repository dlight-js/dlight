import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalAlignBottomOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z\"/>")
      .name("VerticalAlignBottomOutlined")
  }
}

export default VerticalAlignBottomOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
