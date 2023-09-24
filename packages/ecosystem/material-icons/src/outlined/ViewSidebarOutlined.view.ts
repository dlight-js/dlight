import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewSidebarOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v16h20V4H2zm18 4.67h-2.5V6H20v2.67zm-2.5 2H20v2.67h-2.5v-2.67zM4 6h11.5v12H4V6zm13.5 12v-2.67H20V18h-2.5z\"/>")
      .name("ViewSidebarOutlined")
  }
}

export default ViewSidebarOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
