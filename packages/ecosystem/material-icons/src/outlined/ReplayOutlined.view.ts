import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ReplayOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z\"/>")
      .name("ReplayOutlined")
  }
}

export default ReplayOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
