import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TodaySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zM7 10h5v5H7v-5z\"/>")
      .name("TodaySharp")
  }
}

export default TodaySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
