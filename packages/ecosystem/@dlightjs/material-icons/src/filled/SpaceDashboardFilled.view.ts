import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpaceDashboardFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6v18zm2 0h6c1.1 0 2-.9 2-2v-7h-8v9zm8-11V5c0-1.1-.9-2-2-2h-6v7h8z\"/>")
      .name("SpaceDashboardFilled")
  }
}

export default SpaceDashboardFilled as any as Typed<DLightIconType>
