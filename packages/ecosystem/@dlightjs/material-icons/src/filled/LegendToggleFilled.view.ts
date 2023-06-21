import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LegendToggleFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 15H4v-2h16v2zm0 2H4v2h16v-2zm-5-6 5-3.55V5l-5 3.55L10 5 4 8.66V11l5.92-3.61L15 11z\"/>")
      .name("LegendToggleFilled")
  }
}

export default LegendToggleFilled as any as Typed<DLightIconType>
