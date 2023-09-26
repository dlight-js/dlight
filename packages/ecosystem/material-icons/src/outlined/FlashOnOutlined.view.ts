import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FlashOnOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 2v11h3v9l7-12h-4l3-8z\"/>")
      .name("FlashOnOutlined")
  }
}

export default FlashOnOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
