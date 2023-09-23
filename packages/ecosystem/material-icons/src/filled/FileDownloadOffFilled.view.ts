import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FileDownloadOffFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 6.17V3h6v6h4l-3.59 3.59L9 6.17zm12.19 15.02L2.81 2.81 1.39 4.22 6.17 9H5l7 7 .59-.59L15.17 18H5v2h12.17l2.61 2.61 1.41-1.42z\"/>")
      .name("FileDownloadOffFilled")
  }
}

export default FileDownloadOffFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
