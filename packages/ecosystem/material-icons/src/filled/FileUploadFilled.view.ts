import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileUploadFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z\"/>")
      .name("FileUploadFilled")
  }
}

export default FileUploadFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
