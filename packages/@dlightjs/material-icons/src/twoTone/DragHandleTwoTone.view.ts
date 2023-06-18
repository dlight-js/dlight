import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
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

export default DragHandleTwoTone as any as Typed<DLightIconType>
