import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StraightOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 6.83 9.41 8.41 8 7l4-4 4 4-1.41 1.41L13 6.83V21h-2z\"/>")
      .name("StraightOutlined")
  }
}

export default StraightOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
