import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewKanbanOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z\"/><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z\"/>")
      .name("ViewKanbanOutlined")
  }
}

export default ViewKanbanOutlined as any as Typed<DLightIconType>
