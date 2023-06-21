import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShowChartTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13.5 13.48-4-4L2 16.99l1.5 1.5 6-6.01 4 4L22 6.92l-1.41-1.41z\"/>")
      .name("ShowChartTwoTone")
  }
}

export default ShowChartTwoTone as any as Typed<DLightIconType>
