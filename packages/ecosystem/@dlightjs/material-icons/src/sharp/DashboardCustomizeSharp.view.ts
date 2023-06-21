import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DashboardCustomizeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z\"/>")
      .name("DashboardCustomizeSharp")
  }
}

export default DashboardCustomizeSharp as any as Typed<DLightIconType>
