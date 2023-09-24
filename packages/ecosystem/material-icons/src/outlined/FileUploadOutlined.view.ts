import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileUploadOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z\"/>")
      .name("FileUploadOutlined")
  }
}

export default FileUploadOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
