import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CandlestickChartOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 4H7v2H5v12h2v2h2v-2h2V6H9V4zm0 12H7V8h2v8zm10-8h-2V4h-2v4h-2v7h2v5h2v-5h2V8zm-2 5h-2v-3h2v3z\"/>")
      .name("CandlestickChartOutlined")
  }
}

export default CandlestickChartOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
