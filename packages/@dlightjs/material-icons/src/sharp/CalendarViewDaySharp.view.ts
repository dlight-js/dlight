import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CalendarViewDaySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z\"/>")
      .name("CalendarViewDaySharp")
  }
}

export default CalendarViewDaySharp as any as Typed<DLightIconType>
