import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowForwardIosOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z\"/>")
      .name("ArrowForwardIosOutlined")
  }
}

export default ArrowForwardIosOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
