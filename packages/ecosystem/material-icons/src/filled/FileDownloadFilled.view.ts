import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileDownloadFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z\"/>")
      .name("FileDownloadFilled")
  }
}

export default FileDownloadFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
