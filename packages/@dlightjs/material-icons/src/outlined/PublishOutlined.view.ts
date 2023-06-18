import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PublishOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4h14v2H5zm0 10h4v6h6v-6h4l-7-7-7 7zm8-2v6h-2v-6H9.83L12 9.83 14.17 12H13z\"/>")
      .name("PublishOutlined")
  }
}

export default PublishOutlined as any as Typed<DLightIconType>
