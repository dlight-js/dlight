import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CalendarViewDayTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18v2H3zm16-5v1H5v-1h14m2-2H3v5h18v-5zM3 6h18v2H3z\"/><path d=\"M5 12h14v1H5z\" opacity=\".3\"/>")
      .name("CalendarViewDayTwoTone")
  }
}

export default CalendarViewDayTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
