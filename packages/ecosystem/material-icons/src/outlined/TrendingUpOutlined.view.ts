import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TrendingUpOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z\"/>")
      .name("TrendingUpOutlined")
  }
}

export default TrendingUpOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
