import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PublishFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z\"/>")
      .name("PublishFilled")
  }
}

export default PublishFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
