import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EventBusySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m9.31 17 2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM21 3h-3V1h-2v2H8V1H6v2H3.01L3 21h18V3zm-2 16H5V8h14v11z\"/>")
      .name("EventBusySharp")
  }
}

export default EventBusySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
