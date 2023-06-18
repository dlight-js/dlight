import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SpaceDashboardSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 21H3V3h8v18zm2 0h8v-9h-8v9zm8-11V3h-8v7h8z\"/>")
      .name("SpaceDashboardSharp")
  }
}

export default SpaceDashboardSharp as any as Typed<DLightIconType>
