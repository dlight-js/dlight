import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CalendarViewDayFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18v2H3zm0-7h18v5H3zm0-4h18v2H3z\"/>")
      .name("CalendarViewDayFilled")
  }
}

export default CalendarViewDayFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
