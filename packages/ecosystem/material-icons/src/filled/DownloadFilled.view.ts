import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DownloadFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z\"/>")
      .name("DownloadFilled")
  }
}

export default DownloadFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
