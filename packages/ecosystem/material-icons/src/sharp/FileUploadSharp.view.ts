import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileUploadSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 10h4v6h6v-6h4l-7-7-7 7zm0 8v2h14v-2H5z\"/>")
      .name("FileUploadSharp")
  }
}

export default FileUploadSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
