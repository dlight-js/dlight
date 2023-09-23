import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UploadFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z\"/>")
      .name("UploadFilled")
  }
}

export default UploadFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
