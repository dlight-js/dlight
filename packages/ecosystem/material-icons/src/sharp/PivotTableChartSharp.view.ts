import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PivotTableChartSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 3h11v5H10zm-7 7h5v11H3zm0-7h5v5H3zm15 6-4 4h3v4h-4v-3l-4 4 4 4v-3h6v-6h3z\"/>")
      .name("PivotTableChartSharp")
  }
}

export default PivotTableChartSharp as any as Typed<DLightIconType>
