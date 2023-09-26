import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ShortTextOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h16v2H4V9zm0 4h10v2H4v-2z\"/>")
      .name("ShortTextOutlined")
  }
}

export default ShortTextOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
