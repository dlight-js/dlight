import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EventNoteSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10H7v2h10v-2zm4-7h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11zm-5-5H7v2h7v-2z\"/>")
      .name("EventNoteSharp")
  }
}

export default EventNoteSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
