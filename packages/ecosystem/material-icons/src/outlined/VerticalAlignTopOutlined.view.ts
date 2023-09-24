import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalAlignTopOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z\"/>")
      .name("VerticalAlignTopOutlined")
  }
}

export default VerticalAlignTopOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
