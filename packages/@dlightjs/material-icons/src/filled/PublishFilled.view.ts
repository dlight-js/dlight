import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PublishFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z\"/>")
      .name("PublishFilled")
  }
}

export default PublishFilled as any as Typed<DLightIconType>
