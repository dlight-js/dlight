import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DeleteFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/>")
      .name("DeleteFilled")
  }
}

export default DeleteFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
