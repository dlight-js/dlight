import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FileDownloadDoneFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 18h14v2H5v-2zm4.6-2.7L5 10.7l2-1.9 2.6 2.6L17 4l2 2-9.4 9.3z\"/>")
      .name("FileDownloadDoneFilled")
  }
}

export default FileDownloadDoneFilled as any as Typed<DLightIconType>
