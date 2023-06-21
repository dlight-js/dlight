import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BarChartFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z\"/>")
      .name("BarChartFilled")
  }
}

export default BarChartFilled as any as Typed<DLightIconType>
