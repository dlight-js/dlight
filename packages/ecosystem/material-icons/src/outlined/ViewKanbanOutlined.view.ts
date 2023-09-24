import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewKanbanOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 7h2v10H7zm4 0h2v5h-2zm4 0h2v8h-2z\"/><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z\"/>")
      .name("ViewKanbanOutlined")
  }
}

export default ViewKanbanOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
