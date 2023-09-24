import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BarChartTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z\"/>")
      .name("BarChartTwoTone")
  }
}

export default BarChartTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
