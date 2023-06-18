import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DragHandleOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 9H4v2h16V9zM4 15h16v-2H4v2z\"/>")
      .name("DragHandleOutlined")
  }
}

export default DragHandleOutlined as any as Typed<DLightIconType>