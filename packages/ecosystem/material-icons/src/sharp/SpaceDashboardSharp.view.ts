import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SpaceDashboardSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 21H3V3h8v18zm2 0h8v-9h-8v9zm8-11V3h-8v7h8z\"/>")
      .name("SpaceDashboardSharp")
  }
}

export default SpaceDashboardSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
