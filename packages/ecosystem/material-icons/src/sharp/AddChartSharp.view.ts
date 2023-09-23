import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddChartSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19H5V5h9V3H3v18h18V10h-2z\"/><path d=\"M11 7h2v10h-2zm4 6h2v4h-2zm-8-3h2v7H7zm12-5V3h-2v2h-2v2h2v2h2V7h2V5z\"/>")
      .name("AddChartSharp")
  }
}

export default AddChartSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
