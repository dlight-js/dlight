import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TableChartSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 10.02h5V21h-5V10.02zM17 21h5V10h-5v11zm5-18H3v5h19V3zM3 21h5V10H3v11z\"/>")
      .name("TableChartSharp")
  }
}

export default TableChartSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
