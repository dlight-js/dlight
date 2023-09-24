import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DeleteTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 9h8v10H8z\" opacity=\".3\"/><path d=\"m15.5 4-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z\"/>")
      .name("DeleteTwoTone")
  }
}

export default DeleteTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
