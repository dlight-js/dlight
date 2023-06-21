import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InsertChartOutlinedFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"/>")
      .name("InsertChartOutlinedFilled")
  }
}

export default InsertChartOutlinedFilled as any as Typed<DLightIconType>
