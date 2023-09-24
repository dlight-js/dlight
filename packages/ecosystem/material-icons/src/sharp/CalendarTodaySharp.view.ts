import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CalendarTodaySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 3h-3V1h-2v2H7V1H5v2H2v20h20V3zm-2 18H4V8h16v13z\"/>")
      .name("CalendarTodaySharp")
  }
}

export default CalendarTodaySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
