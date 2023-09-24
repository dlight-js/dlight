import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DashboardSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z\"/>")
      .name("DashboardSharp")
  }
}

export default DashboardSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
