import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DragHandleTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h16v2H4zm0 4h16v2H4z\"/>")
      .name("DragHandleTwoTone")
  }
}

export default DragHandleTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
