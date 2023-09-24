import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DragHandleTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h16v2H4zm0 4h16v2H4z\"/>")
      .name("DragHandleTwoTone")
  }
}

export default DragHandleTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
