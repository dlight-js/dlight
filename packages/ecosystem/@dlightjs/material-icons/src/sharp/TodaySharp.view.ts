import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TodaySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zM7 10h5v5H7v-5z\"/>")
      .name("TodaySharp")
  }
}

export default TodaySharp as any as Typed<DLightIconType>
