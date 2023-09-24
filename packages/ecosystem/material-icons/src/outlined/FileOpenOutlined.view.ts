import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileOpenOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 22H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h8l6 6v6h-2V9h-5V4H6v16h9v2zm4-.34v-2.24l2.95 2.95 1.41-1.41L20.41 18h2.24v-2H17v5.66h2z\"/>")
      .name("FileOpenOutlined")
  }
}

export default FileOpenOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
