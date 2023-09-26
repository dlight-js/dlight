import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InsertChartOutlinedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm2-16H3v18h18V3z\"/>")
      .name("InsertChartOutlinedSharp")
  }
}

export default InsertChartOutlinedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
