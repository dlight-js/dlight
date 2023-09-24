import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CalendarViewDaySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18v2H3v-2zm0-7h18v5H3v-5zm0-4h18v2H3V6z\"/>")
      .name("CalendarViewDaySharp")
  }
}

export default CalendarViewDaySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
