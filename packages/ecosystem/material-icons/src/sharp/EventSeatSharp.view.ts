import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EventSeatSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 21h3v-3h10v3h3v-6H4v6zm15-11h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z\"/>")
      .name("EventSeatSharp")
  }
}

export default EventSeatSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
