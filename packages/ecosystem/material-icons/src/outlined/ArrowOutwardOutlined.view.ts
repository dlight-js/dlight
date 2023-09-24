import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowOutwardOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z\"/>")
      .name("ArrowOutwardOutlined")
  }
}

export default ArrowOutwardOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
