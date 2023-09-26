import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ShowChartTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13.5 13.48-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z\"/>")
      .name("ShowChartTwoTone")
  }
}

export default ShowChartTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
