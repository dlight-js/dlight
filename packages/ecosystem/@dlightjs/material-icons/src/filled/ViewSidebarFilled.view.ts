import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewSidebarFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 20H2V4h14v16zm2-12h4V4h-4v4zm0 12h4v-4h-4v4zm0-6h4v-4h-4v4z\"/>")
      .name("ViewSidebarFilled")
  }
}

export default ViewSidebarFilled as any as Typed<DLightIconType>
