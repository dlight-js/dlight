import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DeleteOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z\"/>")
      .name("DeleteOutlined")
  }
}

export default DeleteOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
