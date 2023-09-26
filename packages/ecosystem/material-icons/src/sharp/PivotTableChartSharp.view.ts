import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PivotTableChartSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 3h11v5H10zm-7 7h5v11H3zm0-7h5v5H3zm15 6-4 4h3v4h-4v-3l-4 4 4 4v-3h6v-6h3z\"/>")
      .name("PivotTableChartSharp")
  }
}

export default PivotTableChartSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
