import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FeedOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5zm3 16H5V5h10v4h4v10zM7 17h10v-2H7v2zm5-10H7v2h5V7zm-5 6h10v-2H7v2z\"/>")
      .name("FeedOutlined")
  }
}

export default FeedOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
