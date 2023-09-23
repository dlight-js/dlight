import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CandlestickChartTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 4H7v2H5v12h2v2h2v-2h2V6H9V4zm0 12H7V8h2v8z\"/><path d=\"M7 8h2v8H7zm8 2h2v3h-2z\" opacity=\".3\"/><path d=\"M19 8h-2V4h-2v4h-2v7h2v5h2v-5h2V8zm-2 5h-2v-3h2v3z\"/>")
      .name("CandlestickChartTwoTone")
  }
}

export default CandlestickChartTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
