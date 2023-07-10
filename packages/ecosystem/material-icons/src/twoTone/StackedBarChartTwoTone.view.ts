import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StackedBarChartTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h4v11H4zm0-5h4v4H4zm6 3h4v4h-4zm6 3h4v4h-4zm0 5h4v5h-4zm-6-3h4v8h-4z\"/>")
      .name("StackedBarChartTwoTone")
  }
}

export default StackedBarChartTwoTone as any as Typed<DLightIconType>
