import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default UploadFilled as any as Typed<DLightIconType>
