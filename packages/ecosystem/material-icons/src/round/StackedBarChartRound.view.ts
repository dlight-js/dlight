import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StackedBarChartRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 20c1.1 0 2-.9 2-2V9H4v9c0 1.1.9 2 2 2zM4 8h4V6c0-1.1-.9-2-2-2s-2 .9-2 2v2zm6 3h4V9c0-1.1-.9-2-2-2s-2 .9-2 2v2zm6 1v2h4v-2c0-1.1-.9-2-2-2s-2 .9-2 2zm2 8c1.1 0 2-.9 2-2v-3h-4v3c0 1.1.9 2 2 2zm-6 0c1.1 0 2-.9 2-2v-6h-4v6c0 1.1.9 2 2 2z\"/>")
      .name("StackedBarChartRound")
  }
}

export default StackedBarChartRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
