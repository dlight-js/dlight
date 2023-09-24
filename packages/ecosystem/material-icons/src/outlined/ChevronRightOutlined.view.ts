import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChevronRightOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z\"/>")
      .name("ChevronRightOutlined")
  }
}

export default ChevronRightOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
