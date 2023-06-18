import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewSidebarOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v16h20V4H2zm18 4.67h-2.5V6H20v2.67zm-2.5 2H20v2.67h-2.5v-2.67zM4 6h11.5v12H4V6zm13.5 12v-2.67H20V18h-2.5z\"/>")
      .name("ViewSidebarOutlined")
  }
}

export default ViewSidebarOutlined as any as Typed<DLightIconType>
