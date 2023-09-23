import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FileUploadTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.83 8H11v6h2V8h1.17L12 5.83z\" opacity=\".3\"/><path d=\"M5 18h14v2H5zm0-8h4v6h6v-6h4l-7-7-7 7zm8-2v6h-2V8H9.83L12 5.83 14.17 8H13z\"/>")
      .name("FileUploadTwoTone")
  }
}

export default FileUploadTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
