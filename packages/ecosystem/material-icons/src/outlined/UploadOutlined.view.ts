import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class UploadOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z\"/>")
      .name("UploadOutlined")
  }
}

export default UploadOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
